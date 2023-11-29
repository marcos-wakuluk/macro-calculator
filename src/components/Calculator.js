import React, { useState } from 'react';

const MacronutrientCalculator = () => {
  const [result, setResult] = useState({
    totalCalories: 0,
    proteinCalories: 0,
    carbCalories: 0,
    fatCalories: 0,
  });
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [objetive, setObjetive] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');

  const handleCalculation = () => {
    // Calculating Basal Metabolic Rate (BMR)
    const bmr = gender === 'Masculino'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161

    // Adjusting based on activity level
    const activityLevels = {
      'Sedentario': 1.2,
      'Ligeramente Activo': 1.375,
      'Moderadamente activo': 1.55,
      'Muy activo': 1.725,
      'Extremadamente activo': 1.9,
    };
    const activityMultiplier = activityLevels[activityLevel];
    const totalCalories = Math.round(bmr * activityMultiplier);

    // Adjusting based on goal (Volumen o Definición)
    const adjustedCalories = objetive === 'Volumen'
      ? totalCalories * 1.2
      : totalCalories * 0.8

    // Calculating macronutrients
    const proteinPercentage = 0.25; // 25% of total calories from protein
    const carbPercentage = 0.55; // 55% of total calories from carbs
    const fatPercentage = 0.2; // 20% of total calories from fat

    const proteinCalories = Math.round(adjustedCalories * proteinPercentage);
    const carbCalories = Math.round(adjustedCalories * carbPercentage);
    const fatCalories = Math.round(adjustedCalories * fatPercentage);

    // Calculating grams from calories (4 calories per gram of carbs/protein, 9 calories per gram of fat)
    const proteinGrams = Math.round(proteinCalories / 4);
    const carbGrams = Math.round(carbCalories / 4);
    const fatGrams = Math.round(fatCalories / 9);

    setResult({
      totalCalories: Math.round(adjustedCalories),
      proteinCalories,
      carbCalories,
      fatCalories,
      proteinGrams,
      carbGrams,
      fatGrams,
    });
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleActivityLevelChange = (e) => {
    setActivityLevel(e.target.value);
  };

  const handleObjetiveChange = (e) => {
    setObjetive(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Calculadora de Macronutrientes</h2>
      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Género:</label>
        <select
          name="gender"
          value={gender}
          onChange={handleGenderChange}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Edad:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Peso (Kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Altura (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Nivel de actividad fisica:</label>
        <select
          name="activityLevel"
          value={activityLevel}
          onChange={handleActivityLevelChange}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="Sedentario">Sedentario</option>
          <option value="Ligeramente Activo">Ligeramente Activo</option>
          <option value="Moderadamente activo">Moderadamente activo</option>
          <option value="Muy activo">Muy activo</option>
          <option value="Extremadamente activo">Extremadamente activo</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Objetivo:</label>
        <select
          name="objetive"
          value={objetive}
          onChange={handleObjetiveChange}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="Definicion">Definicion</option>
          <option value="Volumen">Volumen</option>
        </select>
      </div>
      <button
        onClick={handleCalculation}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Calcular
      </button>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">Resultados:</h3>
        <p>Total de calorías: {result.totalCalories}</p>
        <p>Gramos de Proteínas: {result.proteinGrams}</p>
        <p>Gramos de Carbohidratos: {result.carbGrams}</p>
        <p>Gramos de Grasas: {result.fatGrams}</p>
      </div>
    </div>
  );
};

export default MacronutrientCalculator;
