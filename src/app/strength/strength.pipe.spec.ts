import { StrengthPipe } from './strength.pipe';

describe('Test case for strength pipe', () => {

    it('should display weak if strength value is 5', () => {
        const pipe = new StrengthPipe();
        expect(pipe.transform(5)).toEqual('5 (weak)');
    });
    it('should display strong if strength value is 13', () => {
        const pipe = new StrengthPipe();
        expect(pipe.transform(13)).toEqual('13 (strong)');
    });
    it('should display weak if strength value is 100', () => {
        const pipe = new StrengthPipe();
        expect(pipe.transform(100)).toEqual('100 (unbelievable)');
    });
});
