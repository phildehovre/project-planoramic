// "use client";

// import { edit } from "@/app/actions/resourceActions";
// import Form from "../ui/Form";
// import Input from "../ui/Input";
// import { BiEdit } from "react-icons/bi";
// import { useState } from "react";
// import Button from "../ui/Button";
// import { resourceType } from "@/types/resourceTypes";

// const EditResource = ({ resource }: { resource: resourceType }) => {
//   const [editResource, setEditResource] = useState(false);

//   const handleEdit = () => {
//     setEditResource(!editResource);
//     77;
//   };

//   const handleSubmit = () => {
//     setEditResource(false);
//   };
//   return (
//     <div className="flex gap-5 items-center">
//       <Button onClick={handleEdit} text={<BiEdit />} actionButton />

//       {editResource ? (
//         <Form action={edit} onSubmit={handleSubmit}>
//           <Input name="inputId" value={resource.id} type="hidden" />
//           <div className="flex justify-center">
//             <Input type="text" name="newTitle" placeholder="Edit Resource..." />

//             <Button type="submit" text="Save" />
//           </div>
//         </Form>
//       ) : null}
//     </div>
//   );
// };

// export default EditResource;
