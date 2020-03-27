const data1 = [
  {
    id: 225,
    myNum: 225,
    myString: "225*225",
    cat: "f"
  },
  {
    id: 0,
    myNum: 0,
    myString: "0*0",
    cat: "e"
  },
  {
    id: 2,
    myNum: 2,
    myString: "2*2",
    cat: "f"
  },
  {
    id: 3,
    myNum: 3,
    myString: "3*3",
    cat: "c"
  },
  {
    id: 4,
    myNum: 4,
    myString: "4*4",
    cat: "b"
  },
  {
    id: 5,
    myNum: 5,
    myString: "5*5",
    cat: "a"
  },
  {
    id: 6,
    myNum: 6,
    myString: "6*6",
    cat: "e"
  },
  {
    id: 7,
    myNum: 7,
    myString: "7*7",
    cat: "e"
  },
  {
    id: 8,
    myNum: 8,
    myString: "8*8",
    cat: "d"
  },
  {
    id: 9,
    myNum: 9,
    myString: "9*9",
    cat: "d"
  }
]

const data2 = [
  {
    id: 40,
    myNum: 40,
    myString: "40*40",
    cat: "a"
  },
  {
    id: 41,
    myNum: 200,
    myString: "41*41",
    cat: "c"
  },
  {
    id: 42,
    myNum: 42,
    myString: "42*42",
    cat: "c"
  },
  {
    id: 43,
    myNum: 43,
    myString: "43*43",
    cat: "c"
  },
  {
    id: 44,
    myNum: 554,
    myString: "44*44",
    cat: "a"
  },
  {
    id: 45,
    myNum: 420,
    myString: "45*45",
    cat: "c"
  },
  {
    id: 46,
    myNum: 46,
    myString: "46*46",
    cat: "a"
  },
  {
    id: 47,
    myNum: 47,
    myString: "47*47",
    cat: "a"
  },
  {
    id: 48,
    myNum: 11,
    myString: "48*48",
    cat: "b"
  },
  {
    id: 49,
    myNum: 49,
    myString: "49*49",
    cat: "a"
  }
]

const iterateMockDataInFind = (c: string, q: any) => {
  if (q.$skip === 0) {
    return Promise.resolve({total: 10, data: data1})
  }
  return Promise.resolve({total: 15, data: data2})
}

export default iterateMockDataInFind
