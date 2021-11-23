import {TestSuite} from "testyts/build/lib/decorators/testSuite.decorator";
import {Test} from "testyts/build/lib/decorators/test.decorator";
import {AfterAll, AfterEach, BeforeAll, BeforeEach} from "testyts/build/lib/decorators/afterAndBefore.decorator";
import {createTodo, deleteTodo} from "./service/todo.service";
import {TodoDocument} from "./models/todo.model";
import {actionCreators, store} from "./redux";
import {performance} from "perf_hooks";
import {PerformanceType} from "./performance/performance-types";
import {myPerformanceObserver} from "./performance/myPerformanceObserver";
import {getTestCreateTime} from "./performance/performanceTimes";
import {bindActionCreators} from "redux";
import logger from "./utils/logger";
import connect from "./utils/connect";
import {getTodo, getTodos} from "./redux/selectors";
import {ActionType} from "./redux/action-types";
import config from "config";
import disconnect from "./utils/disconnect";

// Vars
let counter: number;
const port = config.get<number>("port");
myPerformanceObserver.observe({entryTypes: ["measure"]});
const {createTodoAction, deleteTodoAction} = bindActionCreators(actionCreators, store.dispatch);

@TestSuite()
export class MyTestSuite {

    @BeforeAll()
    async beforeAll() {
        counter = 0;
        logger.info(`App is running at http://localhost:${port} `);
        await connect();
        store.dispatch({type: ActionType.REHYDRATION});
    }

    @BeforeEach()
    beforeEach() {
        // This is executed before each test
    }

    @AfterEach()
    afterEach() {
        // This is executed after each test
    }

    @AfterAll()
    async afterAll() {
        //await this.deleteTestTodos();
        await disconnect();
    }

    @Test('30x30')
    async create30x30() {
        let average = 0.0;
        for(let i = 0; i < 30; i++) {
            await this.createTodos();
            average += getTestCreateTime();
            await this.deleteTestTodos();
            counter = 0;
        }
        logger.info(`Running 30x30 took ${average} in total.`)
        const a30 = average/30;
        logger.info(`Durchschnittliche Dauer zum erstellen von 30 Todo's: ${a30}`);
    }

    async deleteTestTodos() {
        for(let i = 1; i <= counter; i++) {
            let todoTitle = `test${i}`;

            const todo = getTodo(store.getState(), todoTitle);
            if (!todo) {
                console.log(`No Todo found by Todo-Title:${todoTitle} Status 404`);
            }
            await deleteTodo({todoTitle});
            deleteTodoAction(todoTitle);
        }
    }

    //@Test('Create a variable number of todos')
    async createTodos() {
        performance.mark("startCreate");
        for(let i = 0; i < 30; i++) {
            try {
                const todoD = <TodoDocument>this.createSingleTodo();
                const todo = await createTodo(todoD);
                createTodoAction(todoD);
            } catch (e) {
                logger.error(e);
            }
            //console.log(store.getState());
            //this.testGetTodos();
        }
        performance.mark("endCreate");
        performance.measure(PerformanceType.TEST_CREATE, "startCreate", "endCreate");
        console.log(`Das Erstellen aller Todos hat ${getTestCreateTime()} gedauert.`);
    }

    createSingleTodo() {
        counter++;
        return {
            title: `test${counter}`,
            description: "Any description",
            priority: 1,
            complete: "no"
        };
    }

    //@Test("Get Todos Time")
    testGetTodos() {
        performance.mark("start");
        const todos = getTodos(store.getState());

        if (!todos) {
            console.log("404 in testGetTodos")
        }
        console.log(`${counter} Todos where Displayed`);
        performance.mark("stop");
        performance.measure(PerformanceType.TEST_GET, "start", "stop");
    }
}