export const Locations = [
  {
    id: 1,
    name: "bansher store",
    serviceId: 1,
    image:
      "https://cdn.pixabay.com/photo/2016/11/30/14/08/cafe-1872888_960_720.jpg",
    lat: 29.336833129560457,
    lon: 48.0154034638013,
    phone: "66917953",
    address: "hawally",
  },
  {
    id: 2,
    name: "fixly",
    serviceId: 1,
    image:
      "https://images.pexels.com/photos/417054/pexels-photo-417054.jpeg?auto=compress&cs=tinysrgb&w=600",
    lat: 29.379937825185202,
    lon: 47.985689754959544,
    phone: "66917953",
    address: "sharq",
  },
  {
    id: 3,
    serviceId: 2,

    name: "fix cars",
    image:
      "https://images.pexels.com/photos/417054/pexels-photo-417054.jpeg?auto=compress&cs=tinysrgb&w=600",
    lat: 29.28014357770803,
    lon: 47.96175925119437,
    phone: "66917953",
    address: "farwaniya",
  },
  {
    id: 4,
    serviceId: 3,
    name: "Bansher House",
    image:
      "https://images.pexels.com/photos/417054/pexels-photo-417054.jpeg?auto=compress&cs=tinysrgb&w=600",
    lat: 28.379937825185202,
    lon: 47.985689754959544,
    phone: "66917953",
    address: "sharq",
  },
  {
    id: 5,
    serviceId: 2,

    name: "abo abdallah",
    image:
      "https://images.pexels.com/photos/417054/pexels-photo-417054.jpeg?auto=compress&cs=tinysrgb&w=600",
    lat: 29.379937825185202,
    lon: 48.985689754959544,
    phone: "66917953",
    address: "sharq",
  },
  {
    id: 6,
    serviceId: 4,
    name: "Dream Coffee",
    image:
      "https://cdn.pixabay.com/photo/2015/05/15/14/55/cafe-768771_960_720.jpg",
    lat: 29.37993232202,
    lon: 47.985689754959544,
    phone: "66917953",
    address: "sharq",
  },
  {
    id: 7,
    serviceId: 1,
    name: "bsoon Coffee",
    image:
      "https://cdn.pixabay.com/photo/2015/05/15/14/55/cafe-768771_960_720.jpg",
    lat: 29.62851240414271,
    lon: 47.695021703354314,
    phone: "66001815",
    address: "sharq",
  },
];

export const ServiceDummy: IServices[] = [
  {
    _id: "1",
    name: { ar: "بنشر", en: "bansher" },
  },
  {
    _id: "2",
    name: { en: "wench", ar: "ونش" },
  },
  {
    _id: "3",
    name: { en: "fix", ar: "تصليح" },
  },
  {
    _id: "4",
    name: { en: "cleaning", ar: "تنظيف" },
  },
  {
    _id: "5",
    name: { en: "genral help", ar: "مساعده عامة" },
  },
  {
    _id: "6",
    name: { en: "test", ar: " تجريب" },
  },
  {
    _id: "7",
    name: { en: "local data", ar: " لوكال داتا" },
  },
];



export interface IServices {
  _id: string;
  name: { ar: string; en: string };
  logo?: string,
  appCode?: string,
  status?: string

};
