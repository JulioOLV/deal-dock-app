type Shipping = {
  mode: string;
  tags: string[];
  free_shipping: boolean;
  logistic_type: string;
  store_pick_up: boolean;
};

type SaleTermValueStruct = {
  number: number;
  unit: string;
};

type SaleTerm = {
  id: string;
  name: string;
  value_id: string | null;
  value_name: string;
  value_struct: SaleTermValueStruct | null;
};

type SellerAddress = {
  city: {
    id: string;
    name: string;
  };
  state: {
    id: string;
    name: string;
  };
};

type BuyBoxWinner = {
  item_id: string;
  category_id: string;
  seller_id: number;
  original_price?: number;
  price: number;
  currency_id: string;
  shipping: Shipping;
  warranty: string;
  condition: string;
  sale_terms: SaleTerm[];
  seller_address?: SellerAddress;
};

type ProductPickerProduct = {
  product_id: string;
  picker_label: string;
  picture_id: string;
  thumbnail: string;
  tags: string[];
  permalink: string;
  product_name: string;
  auto_completed: boolean;
};

type ProductPickerAttribute = {
  attribute_id: string;
  template: string;
};

type ProductPicker = {
  picker_id: string;
  picker_name: string;
  products: ProductPickerProduct[];
  tags: string[];
  attributes: ProductPickerAttribute[];
  value_name_delimiter: string;
};

type ProductPicture = {
  id: string;
  url: string;
  suggested_for_picker: string | null;
  max_width: number;
  max_height: number;
  source_metadata: unknown | null;
  tags: string[];
};

type ProductMainFeature = {
  text: string;
  type: string;
  metadata: Record<string, unknown>;
};

type ProductAttributeValue = {
  id: string;
  name: string;
  meta?: {
    value: boolean | string | number;
  };
};

type ProductAttribute = {
  id: string;
  name: string;
  value_id: string;
  value_name: string;
  values: ProductAttributeValue[];
  meta?: {
    value: boolean | string | number;
  };
};

type ProductShortDescription = {
  type: string;
  content: string;
};

type ProductSettings = {
  content: unknown | null;
  listing_strategy: string;
  with_enhanced_pictures: boolean;
  base_site_product_id: string | null;
  exclusive: boolean;
};

export type ProductAPIDetailResponse = {
  id: string;
  catalog_product_id: string;
  status: string;
  pdp_types: string[];
  domain_id: string;
  permalink: string;
  name: string;
  family_name: string;
  type: string;
  buy_box_winner: BuyBoxWinner | null;
  pickers?: ProductPicker[];
  pictures: ProductPicture[];
  description_pictures: unknown[];
  main_features: ProductMainFeature[];
  disclaimers: unknown[];
  attributes: ProductAttribute[];
  short_description: ProductShortDescription;
  parent_id: string | null;
  user_product: unknown | null;
  children_ids: string[];
  settings: ProductSettings;
  quality_type: string;
  release_info: unknown | null;
  presale_info: unknown | null;
  enhanced_content: unknown | null;
  tags: string[];
  date_created: string;
  authorized_stores: unknown | null;
  last_updated: string;
  grouper_id: string | null;
  experiments: Record<string, unknown>;
};
