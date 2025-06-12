import React from "react";

type TodoCardProps = {
  title: string;
  content?: string;
  completed: boolean;
};

export default function TodoCard({ title, content, completed }: TodoCardProps) {
  return (
    <div className={`border rounded p-4 shadow mb-2 ${completed ? 'bg-green-100' : 'bg-white'}`}>
      <h2 className="font-bold text-lg mb-1">{title}</h2>
      {content && <p className="text-gray-700 mb-2">{content}</p>}
      <span className={`text-xs px-2 py-1 rounded ${completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}>{completed ? 'Concluído' : 'Pendente'}</span>
    </div>
  );
} 