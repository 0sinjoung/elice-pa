export type Courses = {
  name: string;
  stargazers_count: number;
};
export interface OrgCourseListResponses {
  course_count: number;
  courses: {
    id: number;
    course_type: number;
    tags: string[];
    title: string;
    short_description: string;
    class_type: number;
    logo_file_url: null | string;
    enrolled_role_period: null | string;
    enrolledRoleBeginDatetime: number | null;
    enrolledRoleEndDatetime: number | null;
    beginDatetime: number;
    endDatetime: null | number;
    isDiscounted: boolean;
    discountedPrice: string;
    discountedPriceUsd: string;
    discountRate: null | any;
    price: string;
    priceUsd: string;
    enroll_type: number;
    is_free: boolean;
  }[];
}

export type Course = {
  id: number;
  course_type: number;
  tags: string[];
  title: string;
  short_description: string;
  class_type: number;
  logo_file_url: null | string;
  enrolled_role_period: null | string;
  enrolledRoleBeginDatetime: number | null;
  enrolledRoleEndDatetime: number | null;
  beginDatetime: number;
  endDatetime: null | number;
  isDiscounted: boolean;
  discountedPrice: string;
  discountedPriceUsd: string;
  discountRate: null | any;
  price: string;
  priceUsd: string;
  enroll_type: number;
  is_free: boolean;
};

export interface ChipProps {
  children: React.ReactNode;
  id: string | number;
  name: string | number;
  initPressed?: boolean;
  onPress?: (id: string, currentPressed: boolean) => void;
  className?: string;
}

export interface PaginationProps {
  totalCount: number;
  countPerPage: number; // 페이지당 보여줄 컨텐츠 갯수
  handleChangePage: (changedPage: number) => void;
}
