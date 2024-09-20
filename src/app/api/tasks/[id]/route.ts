import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

const tasksFilePath = path.join(
  process.cwd(),
  "src",
  "app",
  "data",
  "tasks.json"
);

function readTasksFromFile(): Task[] {
  const data = fs.readFileSync(tasksFilePath, "utf-8");
  return JSON.parse(data) as Task[];
}

function writeTasksToFile(tasks: Task[]) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const tasks = readTasksFromFile();

  const filteredTasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === filteredTasks.length) {
    return NextResponse.json(
      { message: "Tarefa não encontrada" },
      { status: 404 }
    );
  }

  writeTasksToFile(filteredTasks);
  return NextResponse.json(
    { message: "Tarefa deletada com sucesso" },
    { status: 200 }
  );
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const tasks = readTasksFromFile();
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return NextResponse.json(
      { message: "Tarefa não encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(task, { status: 200 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { isCompleted }: { isCompleted: boolean } = await request.json();
  const tasks = readTasksFromFile();

  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return NextResponse.json(
      { message: "Tarefa não encontrada" },
      { status: 404 }
    );
  }

  tasks[taskIndex].isCompleted = isCompleted;
  writeTasksToFile(tasks);

  return NextResponse.json(
    { message: "Tarefa atualizada com sucesso" },
    { status: 200 }
  );
}
