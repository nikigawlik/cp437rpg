class SerializationUtils {
    private static readonly map : string = "0123456789ABCDEF";

    static numberToHex (value : number, places : number) : string {
        let str : string = "";
        if (places >= 8) {
            throw new TypeError();
        }

        value = Math.max(value, 0);
        value = value % (1 << (places*4));

        for(let i : number = 0; i < places; i++) {
            let val : number = (value >> i*4) & 0xf;
            str = SerializationUtils.map.charAt(val) + str;
        }

        return str;
    }

    static hexToNumber (hex : string) : number{
        return parseInt(hex, 16);
    }
}