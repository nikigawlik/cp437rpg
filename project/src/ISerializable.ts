interface ISerializable {
    serialize() : string;
    unserialize(data : string) : this; // unfortunaltely not static, bec of the way interfaces and constructors work
}