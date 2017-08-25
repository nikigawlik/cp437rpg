class ArrayUtils {
    static get2DArray<T>(width : number, height : number, initialValue : T) : T[][] {
        let array : any = [];

        for(let x = 0; x < width; x++) {
            array.push([]);
            for(let y = 0; y < height; y++){
                array[x].push(initialValue);
            }
        }

        return array as T[][];
    }
}