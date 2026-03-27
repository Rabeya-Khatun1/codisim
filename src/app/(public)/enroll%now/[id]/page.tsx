import EnrollmentForm from "@/components/forms/EnrollForm";
import { getSingleCourse } from "@/lib/db/courses";

export default async function EnrollmentPage({
  params,
}: {
  params: { id: string };
}) {
    const {id} = await params;
  const course = await getSingleCourse(id);
  if (!course) {
  return (
    <div className="p-10 text-center">
      <p className="text-red-500">Course not found</p>
    </div>
  );
}
  const plainCourse = {
  ...course,
  _id: course._id.toString(),
};

return <EnrollmentForm course={plainCourse} />;
}