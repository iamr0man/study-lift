import { axios } from '@/utils/axios';

const getCourses = async () => {
  try {
    const { data } = await axios.get('/core/preview-courses');
    return data.courses;
  } catch(error) {
    console.error(error)
  }
}
const getCourseById = async (courseId: string) => {
  try {
    const { data: course } = await axios.get(`/core/preview-courses/${courseId}`);
    return course;
  } catch(error) {
    console.error(error)
  }
}

export {
  getCourses,
  getCourseById
}
