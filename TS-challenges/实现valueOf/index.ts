type ValueOf<T> = T[keyof T];
type a = ValueOf<{ name: string; age: 20 }>; //"string"|20
type b = keyof { name: string; age: 20 }; //"name"|"age"
