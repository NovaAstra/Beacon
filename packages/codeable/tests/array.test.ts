import { sort } from "../src"

describe("Array", () => {
    // describe("merge", () => {

    // })

    describe("sort", () => {
        it('should sort an array of numbers in ascending order', () => {
            const input = [5, 3, 8, 1, 2];
            const sorted = sort(input, (a, b) => a - b);
            expect(sorted).toEqual([1, 2, 3, 5, 8]);
        });

        it('should sort a large array of numbers', () => {
            const input = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 100000));
            const sorted = sort(input, (a, b) => a - b) as number[];
            
     
            for (let i = 0; i < sorted.length - 1; i++) {
                expect(sorted[i]).toBeLessThanOrEqual(sorted[i + 1]);
            }
        });
    
        it('should sort a large array of strings', () => {
            const input = Array.from({ length: 100000 }, () => Math.random().toString(36).substring(2, 15));
            const sorted = sort(input) as string[];
            
            for (let i = 0; i < sorted.length - 1; i++) {
                expect(sorted[i].localeCompare(sorted[i + 1])).toBeLessThanOrEqual(0);
            }
        });
    })
})