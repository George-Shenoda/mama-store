import { Component, createSignal } from "solid-js";
import { createDropzone } from "@soorria/solid-dropzone";
import DOMPurify from "dompurify";
import { addObject } from "../store/ids";
import { useNavigate } from "@solidjs/router";

const Upload: Component<{}> = () => {
    const [file, setFile] = createSignal<File | null>(null);

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    };

    const navigate = useNavigate();

    const dropzone = createDropzone({
        onDrop,
        multiple: false,
        accept: [".jpg", ".jpeg", ".png"],
    });

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const title = DOMPurify.sanitize(formData.get("name") as string);
        const description = DOMPurify.sanitize(
            formData.get("description") as string
        );
        const price = Number(formData.get("price"));
        const imgPath = file()?.name || ""; // placeholder for now

        if (!title || !description || !price) return;
        const newObject = {
            title,
            description,
            price,
            img: imgPath,
        };
        addObject(newObject);
        navigate("/");
    };

    return (
        <div class="max-w-md mx-auto p-4">
            <form onSubmit={handleSubmit} class="flex flex-col gap-4">
                <div>
                    <label for="name" class="block mb-1 font-medium">
                        Name:
                    </label>
                    <input
                        required
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Item name"
                        autocomplete="off"
                        class="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label for="description" class="block mb-1 font-medium">
                        Description:
                    </label>
                    <input
                        required
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Item description"
                        autocomplete="off"
                        class="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label for="price" class="block mb-1 font-medium">
                        Price:
                    </label>
                    <input
                        required
                        type="number"
                        name="price"
                        id="price"
                        placeholder="0"
                        autocomplete="off"
                        class="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div
                    {...dropzone.getRootProps()}
                    class="border border-dashed border-gray-400 p-4 rounded cursor-pointer text-center hover:bg-gray-50"
                >
                    <input {...dropzone.getInputProps()} />
                    {dropzone.isDragActive ? (
                        <p>Drop the file here...</p>
                    ) : file() ? (
                        <div class="flex gap-5 justify-center items-center">
                            <p>Selected file: {file()!.name}</p>
                            <button
                                class="justify-center items-center flex"
                                onClick={() => setFile(null)}
                            >
                                <span class="material-symbols-outlined cursor-pointer">
                                    Close
                                </span>
                            </button>
                        </div>
                    ) : (
                        <p>
                            Drag 'n' drop an image here, or click to select
                            files
                        </p>
                    )}
                </div>
                <input type="submit" value="Add Item" class="click" />
            </form>
        </div>
    );
};

export default Upload;
