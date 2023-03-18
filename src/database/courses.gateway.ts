import { axios } from '@/utils/axios';
import type { ICourse } from "@/types/ICourse.types";

const getCourses = async () => {
  try {
    const { data } = await axios.get<ICourse.Response>('/core/preview-courses');
    return data.courses
  } catch(error) {
    return []
  }
}
const getCourseById = async (courseId: string) => {
  try {
    const { data: course, status } = await axios.get<ICourse.Item>(`/core/preview-courses/${courseId}`);

    if (status === 200 && course) {
      return course
    }
    return null
  } catch(error) {
    return null
  }
}

export {
  getCourses,
  getCourseById
}
