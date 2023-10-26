"use strict";

/* Tests for splitsquare.js
 *
 * Joel Burton <joel@joelburton.com>
 *
 */

if (typeof require === "function") {
    var assert = require("chai").assert;
    var isValid = require("./validate");
}

suite("dump", function () {
    test("should dump ints", function () {
        assert.equal(dump(0), "0");
        assert.equal(dump(1), "1");
    });

    test("should dump arrays", function () {
        assert.equal(dump([0, 1, 0, 1]), "0 1 0 1");
    });

    test("should handle nesting", function () {
        assert.equal(
            dump([0, 0, 0, [1, 1, [0, 0, 0, 0], 1]]),
            "0 0 0 1 1 0 0 0 0 1"
        );
    });
});

suite("isValid", function () {
    test("should allow correct ints", function () {
        assert.isTrue(isValid(0));
        assert.isTrue(isValid(1));
    });

    test("should reject wrong ints", function () {
        assert.isFalse(isValid(3));
    });

    test("should reject wrong types", function () {
        assert.isFalse(isValid({ hey: "there" }));
        assert.isFalse(isValid("yo"));
        assert.isFalse(isValid("1"));
    });

    test("should disallow wrong-length arrays", function () {
        assert.isFalse(isValid([0, 0, 0, 0, 0]));
    });

    test("should allow good arrays", function () {
        assert.isTrue(isValid([0, 0, 0, 0]));
    });

    test("should handle nesting properly", function () {
        assert.isTrue(isValid([0, 0, 0, [1, 1, 1, [0, 0, 0, 0]]]));
        assert.isFalse(isValid([0, 0, 0, [1, 1, 1, 1, [0, 0, 0, 0]]]));
    });
});

suite("simplify", function () {
    test("should be a no-op for ints", function () {
        assert.equal(simplify(1), 1);
        assert.equal(simplify(0), 0);
    });

    test("should not simplify non-matching arrays", function () {
        assert.deepEqual(simplify([1, 0, 1, 0]), [1, 0, 1, 0]);
    });

    test("should simplify matching arrays", function () {
        assert.equal(simplify([1, 1, 1, 1]), 1);
    });

    test("should handle nesting", function () {
        assert.equal(simplify([0, 0, 0, [0, 0, 0, [0, 0, 0, 0]]]), 0);
    });
});

suite("add", function () {
    test("should add ints", function () {
        assert.equal(add(0, 0), 0);
        assert.equal(add(1, 1), 1);
        assert.equal(add(1, 0), 1);
        assert.equal(add(0, 1), 1);
    });

    test("should add arrays", function () {
        // note: .toEqual, not .to.equal, since new list has different identity
        assert.deepEqual(add([1, 0, 1, 0], [0, 0, 0, 1]), [1, 0, 1, 1]);
    });

    test("should handle nesting", function () {
        assert.deepEqual(add(0, [1, 0, 1, 0]), [1, 0, 1, 0]);
        assert.deepEqual(add(1, [1, 0, 1, 0]), [1, 1, 1, 1]);
    });
});
