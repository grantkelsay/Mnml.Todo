import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import { Column, Id, Task } from "../types";
import {CSS} from "@dnd-kit/utilities";
import { useMemo, useRef, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string, isNew: boolean) => void;
    createTask: (columnId: Id, backgroundColor: string, isNew: boolean, editMode: boolean) => void;
    tasks: Task[];
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string, backgroundColor: string, isNew: boolean) => void;
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask} = props;

    const [editMode, setEditMode] = useState(column.isNew);

    const inputRef = useRef<HTMLInputElement | null>(null); // Define the ref type

    const tasksIds = useMemo(() => {
        return tasks.map(task => task.id);
    }, [tasks]);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } 
    = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        disabled: editMode,
    });

    // console.log("column.editMode on start: " + column.isNew);
    // console.log("editMode on start: " + editMode);

    const handleColumnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key != "Enter") return;
        setEditMode((prev) => !prev);
        updateColumn(column.id, column.title, false)
        //console.log("column status: " + column.isNew);
        //console.log("edit status: " + editMode);
    }

    const handleColumnBlur = () => {
        setEditMode((prev) => !prev);
        updateColumn(column.id, column.title, false)

    }

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return <div ref = {setNodeRef} style = {style} className="
        bg-columnBackgroundColor
        opacity-40
        border-2
        border-mainAccentColor
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
        "></div>
    }
    
    return <div ref = {setNodeRef} style = {style} className="
    bg-columnBackgroundColor
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
    "
    >
        {/* Column Title */}
        <div {...attributes} {...listeners} 
        onClick={() => { 
            setEditMode(true); 
            if (inputRef.current) {
                inputRef.current.select();
            }
        }}
        className="
        bg-mainBackgroundColor
        text-md
        h-[60px]
        cursor-grab
        rounded-lg
        p-3
        font-bold
        border-columnBackgroundColor
        hover:text-mainAccentColor
        border-4
        flex
        items-center
        justify-between
        "
        >
            <div className="
            flex
            gap-2
            ">
                <div className="
                flex
                justify-center
                items-center
                bg-columnBackgroundColor
                px-2
                py-1
                text-sm
                rounded-full
                "
                >{tasks.length}</div>
                {!editMode && !column.isNew ? (
                    column.title
                ) : (
                    <input 
                        ref={inputRef}
                        className="
                        bg-black 
                        focus:border-mainAccentColor
                        rounded 
                        border 
                        outline-none 
                        px-2"
                        value = {column.title}
                        onChange={ e => updateColumn(column.id, e.target.value, false)}
                        autoFocus 
                        onBlur={handleColumnBlur}
                        onKeyDown={handleColumnKeyDown}
                    />
                )}
            </div>
            <button 
            onClick= {() => {
                deleteColumn(column.id);
            }}
            className="
            stroke-gray-500
            hover:stroke-white
            hover:bg-columnBackgroundColor
            rounded
            px-1
            py-2
            "
            >
                <TrashIcon />
            </button>
        </div>
        
        {/* Column Task Container */}
        <div className="
        flex 
        flex-grow
        flex-col
        gap-4
        p-2
        overflow-x-hidden
        overflow-y-auto
        ">
            <SortableContext items={tasksIds}>
                {tasks.map((task) => (
                    <TaskCard 
                    key={task.id} 
                    task={task} 
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    />
                ))}
            </SortableContext>
        </div>

        {/* Column Footer */}
        <button className="
            flex 
            gap-2 
            items-center 
            border-columnBackgroundColor 
            border-2 
            rounded-md 
            p-4 
            border-x-columnBackgroundColor 
            hover:bg-mainBackgroundColor 
            hover:text-mainAccentColor
            active:bg-pageBackgroundColor
        "
        onClick={() => createTask(column.id, "#6200EE", true, true)}>
            <PlusIcon />
            Add Task</button>
        </div>
}

export default ColumnContainer