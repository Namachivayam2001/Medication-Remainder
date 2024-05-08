import React from 'react'

export default function Help() {
  return (
    <div className='help-container'>
        <h1 style={{textAlign: 'center'}}>Diabetis input detials</h1>
        <h3>Glucose:</h3>
        <p>Glucose is a simple sugar, also known as blood sugar, that serves as a primary source of energy for living organisms. It is a carbohydrate and is one of the most important energy sources in the body. Glucose is obtained from the foods we eat, especially those rich in carbohydrates like bread, rice, pasta, fruits, and vegetables. In the body, glucose is transported through the bloodstream to various cells where it is used for energy production. Insulin, a hormone produced by the pancreas, helps regulate glucose levels in the blood by facilitating its uptake into cells.</p>
        <h3>Insulin:</h3>
        <p>Insulin is a hormone produced by the pancreSas, specifically by clusters of cells within the pancreas called the beta cells of the islets of Langerhans. It plays a crucial role in regulating blood sugar (glucose) levels in the body.</p>
        <p>When you eat carbohydrates, they are broken down into glucose, which enters the bloodstream. Rising blood glucose levels trigger the pancreas to release insulin into the bloodstream. Insulin acts as a "key" that allows cells throughout the body, such as muscle, fat, and liver cells, to absorb glucose from the bloodstream and use it for energy or storage.</p>
        <h3>BMI:</h3>
        <p>BMI stands for Body Mass Index. It is a measure commonly used to assess whether an individual has a healthy body weight relative to their height. BMI is calculated by dividing a person's weight in kilograms by the square of their height in meters (BMI = weight (kg) / height (m)^2).</p>
        <h3>Diabetes Pedigree Function (DPF):</h3>
        <p>The Diabetes Pedigree Function (DPF) is a numerical value assigned to each individual in a family to represent the likelihood of that person having diabetes based on family history. It's commonly used in studies related to diabetes genetics. The DPF is calculated using information about the age of onset of diabetes in relatives and their relationships to the individual in question. This function helps researchers and healthcare professionals assess the genetic predisposition to diabetes within families.</p>
        <ol>
            <li><b>Collect Information:</b> Gather information about the age of onset of diabetes in the individual's relatives, including parents, siblings, grandparents, aunts, uncles, and cousins.</li>
            <li><b>Assign Weights:</b> Assign weights to each relative based on their relationship to the individual:</li>
            <ul>
                <li>Parents: 2</li>
                <li>Full siblings: 2</li>
                <li>Half-siblings: 1</li>
                <li>Grandparents: 1</li>
                <li>Aunts, uncles: 1</li>
                <li>First cousins: 0.5</li>
            </ul>
            <li><b>DPF Calculation Example:</b></li>
            <ul>
                <li>Let's say the individual's parents both have diabetes with an onset age of 40 and 50, and they have one sibling with diabetes with an onset age of 30.</li>
                <li>The weights for the parents would be 2 each, and the weight for the sibling would be 2.</li>
                <li>If the age of onset of diabetes in a relative is less than 20 years old, the multiplier is 0.1.</li>
                <li>If the age of onset is between 20 and 50 years old, the multiplier is 0.15.</li>
                <li>If the age of onset is over 50 years old, the multiplier is 0.2.</li>
                <li>For the parents: (2 * 0.15) + (2 * 0.2) = 0.7</li>
                <li>For the sibling: (2 * 0.15) = 0.3</li>
                <li>Total sum = 0.7 + 0.3 = 1</li>
                <li>Total weights = 2 + 2 = 4</li>
                <li>DPF = 1 / 4 = 0.25</li>
            </ul>            
        </ol> 
    </div>
  )
}


