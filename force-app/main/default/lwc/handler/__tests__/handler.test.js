import { createElement } from "lwc";
import Handler from "c/handler";

describe("c-handler", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test("TODO: test case generated by CLI command, please fill in test logic", () => {
    const element = createElement("c-handler", { is: Handler });
    document.body.appendChild(element);
    expect(1).toBe(2);
  });
});
