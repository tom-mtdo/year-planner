import * as util from "../util";

describe("Util", () => {
  describe("pathToId", () => {
    it("should pass", () => {
      const inputs = [
        "root.comp1.comp2",
        "root.comp1[0]",
        "root.comp1[0].comp2",
        "root.comp1[1].comp2[0]",
      ];
      const expected = [
        "root-comp1-comp2",
        "root-comp1-0",
        "root-comp1-0-comp2",
        "root-comp1-1-comp2-0",
      ];
      let output;
      inputs.forEach((value, index) => {
        output = util.pathToId(value);
        expect(output).toEqual(expected[index]);
      });
    });
  });

  describe("buildId", () => {
    it("should pass", () => {
      const inputs: any = [
        [undefined, "root"],
        ["root", undefined],
        ["root.comp1[0]", "comp2"],
        ["root.comp1[0]", "comp2", false],
      ];
      const expected = [
        "root",
        "root",
        "root.comp1[0].comp2",
        "root.comp1[0]",
      ];

      let output;
      inputs.forEach((value: any, index: number) => {
        output = util.buildPath(...value);
        expect(output).toEqual(expected[index]);
      });
    });
  });

  describe("Remove iteration", () => {
    it("should pass", () => {
      const input = 'page1.group1[0].group2[2].comp';
      const expected = 'page1.group1.group2.comp';

      const output = util.removeIteration(input);
      expect(output).toEqual(expected);
    })
  })

  // TODO: unit test for compare path
});
