"use client"

import { ProjectForm, ProjectInterface, SessionInterface } from '@/common.types'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import FormFiled from './FormFiled'
import CustomMenu from './CustomMenu'
import { categoryFilters } from '@/constants'
import Button from './Button'
import { createNewProject, fetchToken, updateProject } from '@/lib/actions'
import { useRouter } from 'next/navigation'
type Props = {
    type: string,
    session: SessionInterface,
    project?: ProjectInterface
}
function ProjectForm({ type, session, project }: Props) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState<ProjectForm>({
        title: project?.title || "",
        description: project?.description || "",
        image: project?.image || "",
        liveSiteUrl: project?.liveSiteUrl || "",
        githubUrl: project?.githubUrl || "",
        category: project?.category || ""
    })
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { token } = await fetchToken();
        try {
            if (type == "create") {
                await createNewProject(form, session?.user.id, token);
                router.push("/");
            }

            if (type === "edit") {
                await updateProject(form, project?.id as string, token)

                router.push("/")
            }

        } catch (error) {
            console.log(error);

        } finally {
            setIsSubmitting(false);

        }
    }

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.includes("image"))
            return alert("Please select An Image");
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            const result = fileReader.result as string;
            handleStateChange("image", result);
        }
    }
    const handleStateChange = (filedName: string, value: string) => {
        setForm({ ...form, [filedName]: value });
    }

    return (
        <form onSubmit={handleFormSubmit} className='flexStart form'>
            <div className='flexStart form_image-container '>
                <label htmlFor="poster" className='flexCenter form_image-label'>
                    {!form.image && "chose a Poster for your Project"}
                </label>
                <input
                    type="file"
                    id='poster'
                    accept='image/*'
                    required={type == "create"}
                    className='form_image-input'
                    onChange={handleChangeImage}
                />
                {form.image && <Image src={form?.image} alt='Poster' className='sm:p-10 object-contain z-20' fill />}
            </div>
            <FormFiled
                title="Title"
                state={form.title}
                placeholder="Enter a Title"
                setState={(value) => handleStateChange("title", value)}
                isTextarea={false}
            />
            <FormFiled
                title="Description"
                state={form.description}
                placeholder="Enter a Description"
                setState={(value) => handleStateChange("description", value)}
                isTextarea={false}
            /><FormFiled
                type='url'
                title="Website URL"
                state={form.liveSiteUrl}
                placeholder="https://www.google.com"
                setState={(value) => handleStateChange("liveSiteUrl", value)}
                isTextarea={false}
            /><FormFiled
                type='url'
                title="GitHub"
                state={form.githubUrl}
                placeholder="https://github.com/account/repostry"
                setState={(value) => handleStateChange("githubUrl", value)}
                isTextarea={false}
            />

            {/* {Custom Input  Category} */}
            <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange("category", value)}
            />
            <div className="flexStart w-full">
                <Button
                    title={isSubmitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
                    type="submit"
                    leftIcon={isSubmitting ? "" : "/plus.svg"}
                    submitting={isSubmitting}
                />
            </div>
        </form>
    )
}

export default ProjectForm
