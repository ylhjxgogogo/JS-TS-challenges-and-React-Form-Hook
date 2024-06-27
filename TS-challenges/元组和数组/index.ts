//在元组后面增加一个数
type Append<Tuple extends unknown[], Element> = [...Tuple, Element];
type a = Append<[1, "hhha"], true>; //[1,"hhha",true]
//返回长度+1
type Length<Tuple extends unknown[]> = [...Tuple, unknown]["length"];
type bb = Length<[1]>; //2

//将元组变成数组
type To<Tuple extends unknown[]> = Array<Tuple[number]>;
type arr = To<[1, "hahh"]>;
