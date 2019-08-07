import {greetName} from "./greetName";

it('should say "Hello Jodi"', function () {
    expect(greetName("Jodi")).toBe("Hello Jodi");
});
