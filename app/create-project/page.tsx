import { Model, ProjectForm } from "@/components/"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation";

const CreateProject = async ({ }) => {
    const session = await getCurrentUser();
    if (!session?.user) return redirect("/");
    return (
        <Model>
            <h3 className="modal-head-text">Create a New Project</h3>
            <ProjectForm type={"create"} session={session} />
        </Model>
    )
}

export default CreateProject