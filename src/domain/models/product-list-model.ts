type ProductAttribute = {
  id: string;
  name: string;
  value_id?: string;
  value_name: string;
};

type ProductPicture = {
  id: string;
  url: string;
};

type ProductSettings = {
  listing_strategy: string;
  exclusive: boolean;
};

type ProductResultItem = {
  id: string;
  date_created: string;
  catalog_product_id: string;
  pdp_types: string[];
  status: string;
  domain_id: string;
  settings: ProductSettings;
  name: string;
  main_features: string[];
  attributes: ProductAttribute[];
  pictures: ProductPicture[];
  parent_id?: string;
  children_ids: string[];
  quality_type: string;
  priority: string;
  type: string;
  site_id: string;
  variations: string[];
  keywords: string;
  description: string;
};

type Paging = {
  total: number;
  limit: number;
  offset: number;
};

type UsedAttribute = {
  id: string;
  name: string;
  value_id?: string;
  value_name: string;
};

export type ProductAPIResponse = {
  keywords: string;
  domain_id: string;
  paging: Paging;
  results: ProductResultItem[];
  used_attributes: UsedAttribute[];
  query_type: string;
};