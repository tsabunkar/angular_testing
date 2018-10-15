describe('First Test case', () => {
    let obj;

    beforeEach(() => {
        obj = {};
    });

    it('should be true if true value', () => {
        // arrange
        obj.a = false; // initial state of a property
        // act
        obj.a = true; // changing the state of a property
        // assert
        expect(obj.a).toBe(true);
    });

});
