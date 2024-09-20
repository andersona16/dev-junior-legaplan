import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
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

export async function GET() {
  try {
    const tasks = readTasksFromFile();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    return NextResponse.json(
      { message: "Erro ao buscar tarefas" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title }: { title: string } = await request.json();
    const newTask: Task = { id: uuidv4(), title, isCompleted: false };
    const tasks = readTasksFromFile();
    tasks.push(newTask);
    writeTasksToFile(tasks);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);

    return NextResponse.json(
      { message: "Erro ao adicionar tarefa" },
      { status: 500 }
    );
  }
}
