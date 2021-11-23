import {TestSuite} from "testyts/build/lib/decorators/testSuite.decorator";
import {Test} from "testyts/build/lib/decorators/test.decorator";
import {AfterAll, AfterEach, BeforeAll, BeforeEach} from "testyts/build/lib/decorators/afterAndBefore.decorator";
import {createTodo, deleteTodo} from "./service/todo.service";
import {TodoDocument} from "./models/todo.model";
import {actionCreators, store} from "./redux";
import {performance} from "perf_hooks";
import {PerformanceType} from "./performance/performance-types";
import {myPerformanceObserver} from "./performance/myPerformanceObserver";
import {getTestCreateTime, getTestGetTime} from "./performance/performanceTimes";
import {bindActionCreators} from "redux";
import logger from "./utils/logger";
import {CreateTodoInput} from "./schema/todo.schema";

let counter: number;
myPerformanceObserver.observe({entryTypes: ["measure"]});
const {createTodoAction, deleteTodoAction} = bindActionCreators(actionCreators, store.dispatch);

@TestSuite()
export class MyTestSuite {

    @BeforeAll()
    beforeAll() {
        counter = 0;
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
    afterAll() {

    }

    @Test('Create todos and display them via getTodos')
    async createTodos() {
        logger.info("Start createTodo Test");
        performance.mark("startCreate");
        for(let i = 0; i < 30; i++) {
            try {
                const todoD = <TodoDocument><unknown><CreateTodoInput><unknown>this.createSingleTodo();
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
        let todoBody =
            {
                title: `test${counter}`,
                description: "Any description",
                priority: 1,
                complete: "no"
            };
        counter = counter + 1;
        return todoBody;
    }
/*
    testGetTodos() {
        performance.mark("start");
        const todos = getTodos(store.getState());

        console.log(`${counter}. Todos where Displayed`);
        performance.mark("stop");
        performance.measure(PerformanceType.TEST_GET, "start", "stop");
    }
 */
}

