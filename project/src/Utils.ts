class Utils {
    public static dxFromD(d : number) : number {
        d = ((d % 4) + 4) % 4; // modulo that works correctly for negative numbers
        return d === 0 ? 1 : (d === 2 ? -1 : 0);
    }

    public static dyFromD(d : number) : number {
        d = ((d % 4) + 4) % 4; // modulo that works correctly for negative numbers
        return d === 3 ? 1 : (d === 1 ? -1 : 0);
    }

    // TODO move
    public static sign(x : number) : number {
        if (x > 0) {
            return 1;
        } else
        if (x < 0) {
            return -1;
        }
        else {
            return 0;
        }
    }
}