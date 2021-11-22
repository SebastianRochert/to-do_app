import {TestSuite} from "testyts/build/lib/decorators/testSuite.decorator";
import {Test} from "testyts/build/lib/decorators/test.decorator";
import {expect} from "testyts/build/lib/assertion/expect";
import {AfterAll, AfterEach, BeforeAll, BeforeEach} from "testyts/build/lib/decorators/afterAndBefore.decorator";
import {createTodoHandler} from "./controller/todo.controller";
import e, {request} from "express";

@TestSuite()
export class MyTestSuite {
    @BeforeAll()
    beforeAll() {
        // This is executed before all the tests
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
        // This is executed after all the tests
    }

    @Test()
    onePlusOne() {
        // Act
        const result = 1 + 1;

        const test = e.request({"4"}, "w");
        // Assert
        expect.toBeEqual(result, 2);
        createTodoHandler({}, {})
    }
}

