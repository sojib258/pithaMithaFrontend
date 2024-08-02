export interface Category {
  data: {
    id: number;
    attributes: {
      name: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
}

export interface Author {
  data: {
    id: number;
    attributes: {
      firstName: string;
      lastName: string;
      image: {
        data: {
          id: number;
          attributes: {
            url: string;
            alternativeText: string;
          };
        };
      };
    };
  };
}

export interface FeaturedImage {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string;
    };
  };
}

export interface BlogAttributes {
  title: string;
  slug: string;
  category: Category;
  featuredImage: FeaturedImage;
  users_permissions_user: Author;
  createdAt: string;
}

export interface BlogData {
  id: number;
  attributes: BlogAttributes;
}
