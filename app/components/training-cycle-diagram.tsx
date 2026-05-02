import Image from "next/image";

export default function TrainingCycleDiagram() {
  return (
    <div className="flex justify-center my-8">
      <Image
        src="/assets/training_cycle_v2.svg"
        alt="Ciclo de entrenamiento de un LLM: Predecir, Comparar, Backpropagation, Ajustar pesos"
        className="w-full max-w-2xl"
        width={800}
        height={600}
      />
    </div>
  );
}
