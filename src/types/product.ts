export interface ProductSpec {
  label: {
    [key: string]: string
  }
  value: string
}

export interface ProductVideo {
  url: string
  cover: string
}

export interface Product {
  id: string
  category: string
  name: {
    [key: string]: string
  }
  description: {
    [key: string]: string
  }
  specs: ProductSpec[]
  images: string[]
  videos: ProductVideo[]
  manual: string
  isHot: boolean
}