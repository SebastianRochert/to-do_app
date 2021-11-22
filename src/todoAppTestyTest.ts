import {TestSuite} from "testyts/build/lib/decorators/testSuite.decorator";
import {Test} from "testyts/build/lib/decorators/test.decorator";
import {expect} from "testyts/build/lib/assertion/expect";
import {AfterAll, AfterEach, BeforeAll, BeforeEach} from "testyts/build/lib/decorators/afterAndBefore.decorator";
import e, {request} from "express";
import {createTodo, deleteTodo} from "./service/todo.service";
import TodoModel, {TodoDocument} from "./models/todo.model";
import {createTodoAction, deleteTodoAction} from "./redux/action-creators";
import {getTodos} from "./redux/selectors";
import {store} from "./redux";
import {performance} from "perf_hooks";
import logger from "./utils/logger";
import {PerformanceType} from "./performance/performance-types";
import {myPerformanceObserver} from "./performance/myPerformanceObserver";
import {getTestGetTime} from "./performance/performanceTimes";

let counter: number;
myPerformanceObserver.observe({entryTypes: ["measure"]});

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
        for(let i = 0; i < counter; i++) {
            let todoTitle = `test${i}`;
            const ignore = deleteTodo({todoTitle});
            deleteTodoAction(todoTitle);
        }
    }

    @Test('Create todos and display them via getTodos')
    createTodos() {
        // Creating a bunch of todos
        let ergTestTime = 0.0;
        for(let i = 0; i < 200; i++) {
            const todoD = <TodoDocument>this.createSingleTodo();
            const todo = createTodo(todoD);
            createTodoAction(todoD);

            ergTestTime = ergTestTime + getTestGetTime()

            this.testGetTodos();
        }
        console.log(`Das Erstellen und ausgeben aller Todos hat ${ergTestTime} gedauert.`);
    }

    createSingleTodo() {
        let todoBody = {
            title: `test${counter}`,
            description: "Any description",
            priority: 1,
            complete: "no"
        }
        counter = counter + 1;
        return todoBody;
    }

    testGetTodos() {
        performance.mark("start");
        const todos = getTodos(store.getState());

        console.log(`${counter}. Todos where Displayed`);
        performance.mark("stop");
        performance.measure(PerformanceType.TEST_GET, "start", "stop");
    }
}

