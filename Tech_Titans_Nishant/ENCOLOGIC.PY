import random

# Session data to track the conversation state
session_data = {}

def chatbot_greeting():
    session_data["current_step"] = "start"  # Reset to start
    return {
        'topic': 'Greeting',
        'response': (
            'Hello! 👋 Enco Buddy here ! 🎓<br><br>'
            'I can assist you with the following subjects:<br>'
            'A. <b>Mathematics</b><br>'
            'B. <b>Science</b><br>'
            'C. <b>History</b><br>'
            'D. <b>Language Learning</b><br>'
            'E. <b>Homework Assistance</b><br>'
            'F. <b>Study Scheduling</b><br><br>'
            'Please choose an option by replying with A, B, C, D, E, or F.<br>'
            'Reply with "menu" anytime to go back to the main menu.'
        )
    }

def handle_math(state, user_input=None):
    if state == 'start_math':
        session_data['current_step'] = 'math_menu'
        return {
            'topic': 'Mathematics',
            'response': (
                'Mathematics Help 📐<br>'
                '1. <b>Algebra</b><br>'
                '2. <b>Geometry</b><br>'
                '3. <b>Trigonometry</b><br>'
                '4. <b>Calculus</b><br>'
                'Please reply with the topic number (1, 2, 3, or 4) to learn more!<br>'
                'Reply with "menu" to go back to the main menu.'
            )
        }
    elif state == 'math_menu':
        if user_input == '1':
            session_data['current_step'] = 'algebra_menu'
            return {
                'topic': 'Algebra',
                'response': (
                    'Algebra Topics:<br>'
                    '- Solving Linear Equations<br>'
                    '- Quadratic Equations<br>'
                    '- Polynomials<br>'
                    '- Functions<br>'
                    '- Inequalities<br>'
                    'Please type the exact topic name (e.g., "Solving Linear Equations") for a detailed explanation.<br>'
                    'Reply with "back" to return to the math menu.'
                )
            }
        elif user_input == '2':
            session_data['current_step'] = 'geometry_menu'
            return {
                'topic': 'Geometry',
                'response': (
                    'Geometry Topics:<br>'
                    '- Euclidean Geometry<br>'
                    '- Analytic Geometry<br>'
                    '- Circles and Triangles<br>'
                    '- Coordinate Geometry<br>'
                    'Please type the exact topic name (e.g., "Euclidean Geometry") for a detailed explanation.<br>'
                    'Reply with "back" to return to the math menu.'
                )
            }
        elif user_input == '3':
            session_data['current_step'] = 'trigonometry_menu'
            return {
                'topic': 'Trigonometry',
                'response': (
                    'Trigonometry Topics:<br>'
                    '- Trigonometric Functions<br>'
                    '- Unit Circle<br>'
                    '- Sine and Cosine Laws<br>'
                    '- Trigonometric Identities<br>'
                    'Please type the exact topic name (e.g., "Trigonometric Functions") for a detailed explanation.<br>'
                    'Reply with "back" to return to the math menu.'
                )
            }
        elif user_input == '4':
            session_data['current_step'] = 'calculus_menu'
            return {
                'topic': 'Calculus',
                'response': (
                    'Calculus Topics:<br>'
                    '- Limits and Continuity<br>'
                    '- Derivatives<br>'
                    '- Integrals<br>'
                    '- Differential Equations<br>'
                    'Please type the exact topic name (e.g., "Derivatives") for a detailed explanation.<br>'
                    'Reply with "back" to return to the math menu.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid choice. Please reply with 1, 2, 3, or 4, or type "menu" to return to the main menu.'}
    elif state == 'algebra_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'math_menu'
            return handle_math('start_math')
        elif user_input.lower() == 'solving linear equations':
            return {
                'topic': 'Solving Linear Equations',
                'response': (
                    '<b>Solving Linear Equations:</b><br>'
                    'A linear equation is an equation of the form ax + b = 0, where a and b are constants.<br>'
                    'Steps to solve:<br>'
                    '1. Isolate the variable term (ax) on one side.<br>'
                    '2. Divide both sides by the coefficient (a) to solve for x.<br>'
                    'Example: Solve 2x + 3 = 7.<br>'
                    'Step 1: Subtract 3 from both sides: 2x = 4.<br>'
                    'Step 2: Divide by 2: x = 2.<br>'
                    'Linear equations are fundamental in algebra and are used to model real-world problems.'
                )
            }
        elif user_input.lower() == 'quadratic equations':
            return {
                'topic': 'Quadratic Equations',
                'response': (
                    '<b>Quadratic Equations:</b><br>'
                    'A quadratic equation is of the form ax² + bx + c = 0, where a, b, and c are constants.<br>'
                    'Solutions can be found using:<br>'
                    '1. Factoring<br>'
                    '2. Quadratic Formula: x = [-b ± √(b² - 4ac)] / 2a<br>'
                    'Example: Solve x² - 5x + 6 = 0.<br>'
                    'Step 1: Factor: (x - 2)(x - 3) = 0.<br>'
                    'Step 2: Solutions: x = 2 or x = 3.<br>'
                    'Quadratic equations are used in physics, engineering, and economics.'
                )
            }
        elif user_input.lower() == 'polynomials':
            return {
                'topic': 'Polynomials',
                'response': (
                    '<b>Polynomials:</b><br>'
                    'A polynomial is an expression consisting of variables and coefficients, involving operations of addition, subtraction, multiplication, and non-negative integer exponents.<br>'
                    'Key concepts:<br>'
                    '- Degree of a polynomial (e.g., quadratic polynomials have degree 2).<br>'
                    '- Factoring polynomials (e.g., factoring x² - 5x + 6 into (x - 2)(x - 3)).<br>'
                    '- Polynomial long division.<br>'
                    'Example: Factor the polynomial x² - 5x + 6.<br>'
                    'Step 1: Find two numbers that multiply to 6 and add to -5 (e.g., -2 and -3).<br>'
                    'Step 2: Write the factored form: (x - 2)(x - 3).<br>'
                    'Polynomials are used in algebra, calculus, and many real-world applications.'
                )
            }
        elif user_input.lower() == 'functions':
            return {
                'topic': 'Functions',
                'response': (
                    '<b>Functions:</b><br>'
                    'A function is a relation between a set of inputs (domain) and a set of permissible outputs (range) with the property that each input is related to exactly one output.<br>'
                    'Key concepts:<br>'
                    '- Domain and Range<br>'
                    '- Linear, Quadratic, and Exponential Functions<br>'
                    '- Function Notation (e.g., f(x) = 2x + 3)<br>'
                    'Example: For the function f(x) = 2x + 3, find f(4).<br>'
                    'Step 1: Substitute x = 4 into the function: f(4) = 2(4) + 3.<br>'
                    'Step 2: Calculate: f(4) = 8 + 3 = 11.<br>'
                    'Functions are fundamental in mathematics and are used to model relationships between variables.'
                )
            }
        elif user_input.lower() == 'inequalities':
            return {
                'topic': 'Inequalities',
                'response': (
                    '<b>Inequalities:</b><br>'
                    'An inequality is a mathematical statement that compares two expressions using inequality signs (e.g., <, >, ≤, ≥).<br>'
                    'Key concepts:<br>'
                    '- Solving linear inequalities (e.g., 2x + 3 > 7).<br>'
                    '- Graphing inequalities on a number line.<br>'
                    '- Compound inequalities (e.g., -2 < x ≤ 5).<br>'
                    'Example: Solve the inequality 2x + 3 > 7.<br>'
                    'Step 1: Subtract 3 from both sides: 2x > 4.<br>'
                    'Step 2: Divide by 2: x > 2.<br>'
                    'Inequalities are used to represent constraints in real-world problems.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the math menu.'}
    elif state == 'geometry_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'math_menu'
            return handle_math('start_math')
        elif user_input.lower() == 'euclidean geometry':
            return {
                'topic': 'Euclidean Geometry',
                'response': (
                    '<b>Euclidean Geometry:</b><br>'
                    'Euclidean geometry is the study of plane and solid figures based on axioms and theorems by the Greek mathematician Euclid.<br>'
                    'Key concepts:<br>'
                    '- Points, lines, and planes<br>'
                    '- Angles and triangles<br>'
                    '- Circles and polygons<br>'
                    '- The Pythagorean theorem<br>'
                    'Example: In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides (a² + b² = c²).<br>'
                    'Euclidean geometry is foundational in mathematics and architecture.'
                )
            }
        elif user_input.lower() == 'analytic geometry':
            return {
                'topic': 'Analytic Geometry',
                'response': (
                    '<b>Analytic Geometry:</b><br>'
                    'Analytic geometry uses algebra and coordinates to study geometric shapes.<br>'
                    'Key concepts:<br>'
                    '- Coordinate systems (Cartesian, polar)<br>'
                    '- Equations of lines, circles, and conic sections<br>'
                    '- Distance and midpoint formulas<br>'
                    'Example: The equation of a circle with center (h, k) and radius r is (x - h)² + (y - k)² = r².<br>'
                    'Analytic geometry bridges algebra and geometry and is used in computer graphics and physics.'
                )
            }
        elif user_input.lower() == 'circles and triangles':
            return {
                'topic': 'Circles and Triangles',
                'response': (
                    '<b>Circles and Triangles:</b><br>'
                    'Circles and triangles are fundamental shapes in geometry.<br>'
                    'Key concepts:<br>'
                    '- Properties of circles (e.g., radius, diameter, circumference).<br>'
                    '- Types of triangles (e.g., equilateral, isosceles, scalene).<br>'
                    '- Theorems related to circles and triangles (e.g., Thales\' theorem).<br>'
                    'Example: The area of a circle is given by A = πr², where r is the radius.<br>'
                    'Circles and triangles are used in architecture, engineering, and design.'
                )
            }
        elif user_input.lower() == 'coordinate geometry':
            return {
                'topic': 'Coordinate Geometry',
                'response': (
                    '<b>Coordinate Geometry:</b><br>'
                    'Coordinate geometry, also known as analytic geometry, uses coordinates to represent geometric shapes.<br>'
                    'Key concepts:<br>'
                    '- Cartesian coordinates (x, y).<br>'
                    '- Equations of lines and curves.<br>'
                    '- Distance and midpoint formulas.<br>'
                    'Example: The distance between two points (x₁, y₁) and (x₂, y₂) is given by √((x₂ - x₁)² + (y₂ - y₁)²).<br>'
                    'Coordinate geometry is used in physics, engineering, and computer graphics.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the math menu.'}
    elif state == 'trigonometry_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'math_menu'
            return handle_math('start_math')
        elif user_input.lower() == 'trigonometric functions':
            return {
                'topic': 'Trigonometric Functions',
                'response': (
                    '<b>Trigonometric Functions:</b><br>'
                    'Trigonometric functions relate angles to the ratios of sides in a right triangle.<br>'
                    'Key functions:<br>'
                    '- Sine (sin), Cosine (cos), Tangent (tan)<br>'
                    '- Cosecant (csc), Secant (sec), Cotangent (cot)<br>'
                    'Example: In a right triangle, sin(θ) = opposite/hypotenuse, cos(θ) = adjacent/hypotenuse, tan(θ) = opposite/adjacent.<br>'
                    'Trigonometric functions are used in waves, oscillations, and circular motion.'
                )
            }
        elif user_input.lower() == 'unit circle':
            return {
                'topic': 'Unit Circle',
                'response': (
                    '<b>Unit Circle:</b><br>'
                    'The unit circle is a circle with a radius of 1 centered at the origin (0, 0) in the coordinate plane.<br>'
                    'Key concepts:<br>'
                    '- Angles are measured in radians or degrees.<br>'
                    '- The coordinates (x, y) on the unit circle correspond to (cos(θ), sin(θ)).<br>'
                    'Example: At θ = 90°, the coordinates are (0, 1), so cos(90°) = 0 and sin(90°) = 1.<br>'
                    'The unit circle is essential for understanding trigonometric functions and their properties.'
                )
            }
        elif user_input.lower() == 'sine and cosine laws':
            return {
                'topic': 'Sine and Cosine Laws',
                'response': (
                    '<b>Sine and Cosine Laws:</b><br>'
                    'The sine and cosine laws are used to solve triangles that are not right-angled.<br>'
                    'Key concepts:<br>'
                    '- Sine Law: a/sin(A) = b/sin(B) = c/sin(C).<br>'
                    '- Cosine Law: c² = a² + b² - 2ab cos(C).<br>'
                    'Example: Use the sine law to find a missing side or angle in a triangle.<br>'
                    'These laws are used in navigation, surveying, and engineering.'
                )
            }
        elif user_input.lower() == 'trigonometric identities':
            return {
                'topic': 'Trigonometric Identities',
                'response': (
                    '<b>Trigonometric Identities:</b><br>'
                    'Trigonometric identities are equations involving trigonometric functions that are true for all values of the variables.<br>'
                    'Key identities:<br>'
                    '- Pythagorean identity: sin²(θ) + cos²(θ) = 1.<br>'
                    '- Sum and difference identities.<br>'
                    '- Double-angle identities.<br>'
                    'Example: Use the Pythagorean identity to simplify expressions.<br>'
                    'Trigonometric identities are used in calculus, physics, and engineering.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the math menu.'}
    elif state == 'calculus_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'math_menu'
            return handle_math('start_math')
        elif user_input.lower() == 'limits and continuity':
            return {
                'topic': 'Limits and Continuity',
                'response': (
                    '<b>Limits and Continuity:</b><br>'
                    'Limits describe the behavior of a function as the input approaches a certain value.<br>'
                    'Key concepts:<br>'
                    '- Definition of a limit.<br>'
                    '- Continuity of a function.<br>'
                    '- Limits at infinity.<br>'
                    'Example: Find the limit of f(x) = (x² - 1)/(x - 1) as x approaches 1.<br>'
                    'Step 1: Simplify: f(x) = (x + 1).<br>'
                    'Step 2: The limit is 2.<br>'
                    'Limits and continuity are foundational in calculus.'
                )
            }
        elif user_input.lower() == 'derivatives':
            return {
                'topic': 'Derivatives',
                'response': (
                    '<b>Derivatives:</b><br>'
                    'A derivative represents the rate of change of a function with respect to a variable.<br>'
                    'Key concepts:<br>'
                    '- The derivative of f(x) is f\'(x) or df/dx.<br>'
                    '- Rules: Power rule, product rule, quotient rule, chain rule.<br>'
                    'Example: The derivative of f(x) = x² is f\'(x) = 2x.<br>'
                    'Derivatives are used in physics for velocity and acceleration, and in economics for marginal cost and revenue.'
                )
            }
        elif user_input.lower() == 'integrals':
            return {
                'topic': 'Integrals',
                'response': (
                    '<b>Integrals:</b><br>'
                    'An integral represents the area under a curve or the accumulation of quantities.<br>'
                    'Key concepts:<br>'
                    '- Definite and indefinite integrals.<br>'
                    '- Fundamental Theorem of Calculus.<br>'
                    '- Techniques: Substitution, integration by parts.<br>'
                    'Example: The integral of f(x) = 2x is F(x) = x² + C, where C is the constant of integration.<br>'
                    'Integrals are used in physics for work and energy, and in probability for calculating probabilities.'
                )
            }
        elif user_input.lower() == 'differential equations':
            return {
                'topic': 'Differential Equations',
                'response': (
                    '<b>Differential Equations:</b><br>'
                    'A differential equation is an equation that relates a function with its derivatives.<br>'
                    'Key concepts:<br>'
                    '- Ordinary differential equations (ODEs).<br>'
                    '- Partial differential equations (PDEs).<br>'
                    '- Solving differential equations using separation of variables.<br>'
                    'Example: Solve the differential equation dy/dx = 2x.<br>'
                    'Step 1: Integrate both sides: y = x² + C.<br>'
                    'Differential equations are used in physics, engineering, and biology.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the math menu.'}
    else:
        return {'topic': 'Invalid State', 'response': 'Invalid state. Please start over.'}

def handle_science(state, user_input=None):
    if state == 'start_science':
        session_data['current_step'] = 'science_menu'
        return {
            'topic': 'Science',
            'response': (
                'Science Help 🔬<br>'
                '1. <b>Physics</b><br>'
                '2. <b>Chemistry</b><br>'
                '3. <b>Biology</b><br>'
                '4. <b>Earth Science</b><br>'
                'Please reply with the topic number (1, 2, 3, or 4) to learn more!<br>'
                'Reply with "menu" to go back to the main menu.'
            )
        }
    elif state == 'science_menu':
        if user_input == '1':
            session_data['current_step'] = 'physics_menu'
            return {
                'topic': 'Physics',
                'response': (
                    'Physics Topics:<br>'
                    '- Classical Mechanics<br>'
                    '- Electromagnetism<br>'
                    '- Thermodynamics<br>'
                    '- Quantum Mechanics<br>'
                    'Please type the exact topic name (e.g., "Classical Mechanics") for a detailed explanation.<br>'
                    'Reply with "back" to return to the science menu.'
                )
            }
        elif user_input == '2':
            session_data['current_step'] = 'chemistry_menu'
            return {
                'topic': 'Chemistry',
                'response': (
                    'Chemistry Topics:<br>'
                    '- Organic Chemistry<br>'
                    '- Inorganic Chemistry<br>'
                    '- Physical Chemistry<br>'
                    '- Analytical Chemistry<br>'
                    'Please type the exact topic name (e.g., "Organic Chemistry") for a detailed explanation.<br>'
                    'Reply with "back" to return to the science menu.'
                )
            }
        elif user_input == '3':
            session_data['current_step'] = 'biology_menu'
            return {
                'topic': 'Biology',
                'response': (
                    'Biology Topics:<br>'
                    '- Molecular Biology<br>'
                    '- Genetics<br>'
                    '- Cell Biology<br>'
                    '- Ecology<br>'
                    'Please type the exact topic name (e.g., "Molecular Biology") for a detailed explanation.<br>'
                    'Reply with "back" to return to the science menu.'
                )
            }
        elif user_input == '4':
            session_data['current_step'] = 'earth_science_menu'
            return {
                'topic': 'Earth Science',
                'response': (
                    'Earth Science Topics:<br>'
                    '- Geology<br>'
                    '- Meteorology<br>'
                    '- Oceanography<br>'
                    '- Environmental Science<br>'
                    'Please type the exact topic name (e.g., "Geology") for a detailed explanation.<br>'
                    'Reply with "back" to return to the science menu.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid choice. Please reply with 1, 2, 3, or 4, or type "menu" to return to the main menu.'}
    elif state == 'physics_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'science_menu'
            return handle_science('start_science')
        elif user_input.lower() == 'classical mechanics':
            return {
                'topic': 'Classical Mechanics',
                'response': (
                    '<b>Classical Mechanics:</b><br>'
                    'Classical mechanics is the study of the motion of objects under the influence of forces.<br>'
                    'Key concepts:<br>'
                    '- Newton\'s Laws of Motion<br>'
                    '- Work, Energy, and Power<br>'
                    '- Momentum and Collisions<br>'
                    'Example: Newton\'s Second Law states that F = ma, where F is force, m is mass, and a is acceleration.<br>'
                    'Classical mechanics is foundational in physics and engineering.'
                )
            }
        elif user_input.lower() == 'electromagnetism':
            return {
                'topic': 'Electromagnetism',
                'response': (
                    '<b>Electromagnetism:</b><br>'
                    'Electromagnetism is the study of electric and magnetic fields and their interactions.<br>'
                    'Key concepts:<br>'
                    '- Coulomb\'s Law<br>'
                    '- Maxwell\'s Equations<br>'
                    '- Electromagnetic Waves<br>'
                    'Example: Coulomb\'s Law describes the force between two charged particles: F = k * (q1 * q2) / r².<br>'
                    'Electromagnetism is essential for understanding electricity, magnetism, and light.'
                )
            }
        elif user_input.lower() == 'thermodynamics':
            return {
                'topic': 'Thermodynamics',
                'response': (
                    '<b>Thermodynamics:</b><br>'
                    'Thermodynamics is the study of heat, work, and energy.<br>'
                    'Key concepts:<br>'
                    '- Laws of Thermodynamics<br>'
                    '- Heat Transfer<br>'
                    '- Entropy<br>'
                    'Example: The First Law of Thermodynamics states that energy cannot be created or destroyed, only transferred or converted.<br>'
                    'Thermodynamics is used in engineering, chemistry, and environmental science.'
                )
            }
        elif user_input.lower() == 'quantum mechanics':
            return {
                'topic': 'Quantum Mechanics',
                'response': (
                    '<b>Quantum Mechanics:</b><br>'
                    'Quantum mechanics is the study of the behavior of matter and energy at the atomic and subatomic levels.<br>'
                    'Key concepts:<br>'
                    '- Wave-Particle Duality<br>'
                    '- Schrödinger\'s Equation<br>'
                    '- Quantum Superposition<br>'
                    'Example: The double-slit experiment demonstrates the wave-particle duality of electrons.<br>'
                    'Quantum mechanics is fundamental in modern physics and technology.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the science menu.'}
    elif state == 'chemistry_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'science_menu'
            return handle_science('start_science')
        elif user_input.lower() == 'organic chemistry':
            return {
                'topic': 'Organic Chemistry',
                'response': (
                    '<b>Organic Chemistry:</b><br>'
                    'Organic chemistry is the study of carbon-containing compounds and their reactions.<br>'
                    'Key concepts:<br>'
                    '- Hydrocarbons<br>'
                    '- Functional Groups<br>'
                    '- Reaction Mechanisms<br>'
                    'Example: The simplest hydrocarbon is methane (CH4), which is a key component of natural gas.<br>'
                    'Organic chemistry is fundamental in biochemistry, medicine, and materials science.'
                )
            }
        elif user_input.lower() == 'inorganic chemistry':
            return {
                'topic': 'Inorganic Chemistry',
                'response': (
                    '<b>Inorganic Chemistry:</b><br>'
                    'Inorganic chemistry is the study of non-carbon-containing compounds and their properties.<br>'
                    'Key concepts:<br>'
                    '- Coordination Compounds<br>'
                    '- Acids and Bases<br>'
                    '- Solid-State Chemistry<br>'
                    'Example: Sodium chloride (NaCl) is a common inorganic compound known as table salt.<br>'
                    'Inorganic chemistry is important in materials science, catalysis, and environmental science.'
                )
            }
        elif user_input.lower() == 'physical chemistry':
            return {
                'topic': 'Physical Chemistry',
                'response': (
                    '<b>Physical Chemistry:</b><br>'
                    'Physical chemistry is the study of the physical properties and behavior of chemical systems.<br>'
                    'Key concepts:<br>'
                    '- Thermodynamics<br>'
                    '- Kinetics<br>'
                    '- Quantum Chemistry<br>'
                    'Example: The Arrhenius equation describes the temperature dependence of reaction rates.<br>'
                    'Physical chemistry bridges chemistry and physics.'
                )
            }
        elif user_input.lower() == 'analytical chemistry':
            return {
                'topic': 'Analytical Chemistry',
                'response': (
                    '<b>Analytical Chemistry:</b><br>'
                    'Analytical chemistry is the study of methods for determining the composition of matter.<br>'
                    'Key concepts:<br>'
                    '- Qualitative and Quantitative Analysis<br>'
                    '- Spectroscopy<br>'
                    '- Chromatography<br>'
                    'Example: Gas chromatography is used to separate and analyze compounds in a mixture.<br>'
                    'Analytical chemistry is essential in research, industry, and environmental monitoring.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the science menu.'}
    elif state == 'biology_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'science_menu'
            return handle_science('start_science')
        elif user_input.lower() == 'molecular biology':
            return {
                'topic': 'Molecular Biology',
                'response': (
                    '<b>Molecular Biology:</b><br>'
                    'Molecular biology is the study of the molecular basis of biological activity.<br>'
                    'Key concepts:<br>'
                    '- DNA, RNA, and Protein Synthesis<br>'
                    '- Gene Expression<br>'
                    '- Genetic Engineering<br>'
                    'Example: The central dogma of molecular biology describes the flow of genetic information: DNA → RNA → Protein.<br>'
                    'Molecular biology is crucial for understanding genetics, biotechnology, and medicine.'
                )
            }
        elif user_input.lower() == 'genetics':
            return {
                'topic': 'Genetics',
                'response': (
                    '<b>Genetics:</b><br>'
                    'Genetics is the study of genes, heredity, and genetic variation.<br>'
                    'Key concepts:<br>'
                    '- Mendelian Inheritance<br>'
                    '- DNA Structure and Function<br>'
                    '- Genetic Disorders<br>'
                    'Example: Gregor Mendel\'s experiments with pea plants laid the foundation for modern genetics.<br>'
                    'Genetics is essential for understanding evolution, disease, and biodiversity.'
                )
            }
        elif user_input.lower() == 'cell biology':
            return {
                'topic': 'Cell Biology',
                'response': (
                    '<b>Cell Biology:</b><br>'
                    'Cell biology is the study of the structure and function of cells.<br>'
                    'Key concepts:<br>'
                    '- Cell Organelles<br>'
                    '- Cell Division<br>'
                    '- Cell Signaling<br>'
                    'Example: The cell membrane regulates the movement of substances in and out of the cell.<br>'
                    'Cell biology is fundamental to understanding life processes.'
                )
            }
        elif user_input.lower() == 'ecology':
            return {
                'topic': 'Ecology',
                'response': (
                    '<b>Ecology:</b><br>'
                    'Ecology is the study of the interactions between organisms and their environment.<br>'
                    'Key concepts:<br>'
                    '- Ecosystems<br>'
                    '- Food Chains and Webs<br>'
                    '- Biodiversity<br>'
                    'Example: A food chain shows the flow of energy from producers (plants) to consumers (animals).<br>'
                    'Ecology is important for understanding environmental issues and conservation.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the science menu.'}
    elif state == 'earth_science_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'science_menu'
            return handle_science('start_science')
        elif user_input.lower() == 'geology':
            return {
                'topic': 'Geology',
                'response': (
                    '<b>Geology:</b><br>'
                    'Geology is the study of the Earth\'s structure, materials, and processes.<br>'
                    'Key concepts:<br>'
                    '- Plate Tectonics<br>'
                    '- Rock Cycle<br>'
                    '- Earthquakes and Volcanoes<br>'
                    'Example: The theory of plate tectonics explains the movement of Earth\'s lithospheric plates.<br>'
                    'Geology is important for understanding natural hazards, resource exploration, and environmental change.'
                )
            }
        elif user_input.lower() == 'meteorology':
            return {
                'topic': 'Meteorology',
                'response': (
                    '<b>Meteorology:</b><br>'
                    'Meteorology is the study of the atmosphere and weather phenomena.<br>'
                    'Key concepts:<br>'
                    '- Weather Systems<br>'
                    '- Climate Change<br>'
                    '- Atmospheric Pressure<br>'
                    'Example: The Coriolis effect influences the rotation of weather systems in the atmosphere.<br>'
                    'Meteorology is essential for weather forecasting and climate science.'
                )
            }
        elif user_input.lower() == 'oceanography':
            return {
                'topic': 'Oceanography',
                'response': (
                    '<b>Oceanography:</b><br>'
                    'Oceanography is the study of the oceans and their processes.<br>'
                    'Key concepts:<br>'
                    '- Ocean Currents<br>'
                    '- Marine Ecosystems<br>'
                    '- Ocean-Atmosphere Interactions<br>'
                    'Example: The Gulf Stream is a powerful ocean current that influences the climate of the eastern United States and Europe.<br>'
                    'Oceanography is important for understanding marine life, climate, and resources.'
                )
            }
        elif user_input.lower() == 'environmental science':
            return {
                'topic': 'Environmental Science',
                'response': (
                    '<b>Environmental Science:</b><br>'
                    'Environmental science is the study of the environment and solutions to environmental problems.<br>'
                    'Key concepts:<br>'
                    '- Pollution<br>'
                    '- Conservation<br>'
                    '- Sustainability<br>'
                    'Example: Recycling reduces waste and conserves natural resources.<br>'
                    'Environmental science is crucial for addressing global challenges like climate change and biodiversity loss.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the science menu.'}
    else:
        return {'topic': 'Invalid State', 'response': 'Invalid state. Please start over.'}

def handle_history(state, user_input=None):
    if state == 'start_history':
        session_data['current_step'] = 'history_menu'
        return {
            'topic': 'History',
            'response': (
                'History Help 📜<br>'
                '1. <b>Ancient History</b><br>'
                '2. <b>Medieval History</b><br>'
                '3. <b>Modern History</b><br>'
                '4. <b>World Wars</b><br>'
                'Please reply with the topic number (1, 2, 3, or 4) to learn more!<br>'
                'Reply with "menu" to go back to the main menu.'
            )
        }
    elif state == 'history_menu':
        if user_input == '1':
            session_data['current_step'] = 'ancient_history_menu'
            return {
                'topic': 'Ancient History',
                'response': (
                    'Ancient History Topics:<br>'
                    '- Mesopotamia<br>'
                    '- Ancient Egypt<br>'
                    '- Ancient Greece<br>'
                    '- Ancient Rome<br>'
                    'Please type the exact topic name (e.g., "Ancient Egypt") for a detailed explanation.<br>'
                    'Reply with "back" to return to the history menu.'
                )
            }
        elif user_input == '2':
            session_data['current_step'] = 'medieval_history_menu'
            return {
                'topic': 'Medieval History',
                'response': (
                    'Medieval History Topics:<br>'
                    '- Feudalism<br>'
                    '- The Crusades<br>'
                    '- The Black Death<br>'
                    '- The Renaissance<br>'
                    'Please type the exact topic name (e.g., "The Crusades") for a detailed explanation.<br>'
                    'Reply with "back" to return to the history menu.'
                )
            }
        elif user_input == '3':
            session_data['current_step'] = 'modern_history_menu'
            return {
                'topic': 'Modern History',
                'response': (
                    'Modern History Topics:<br>'
                    '- The Age of Exploration<br>'
                    '- The Enlightenment<br>'
                    '- The French Revolution<br>'
                    '- The Industrial Revolution<br>'
                    'Please type the exact topic name (e.g., "The French Revolution") for a detailed explanation.<br>'
                    'Reply with "back" to return to the history menu.'
                )
            }
        elif user_input == '4':
            session_data['current_step'] = 'world_wars_menu'
            return {
                'topic': 'World Wars',
                'response': (
                    'World Wars Topics:<br>'
                    '- World War I<br>'
                    '- World War II<br>'
                    '- Causes and Consequences<br>'
                    '- Major Battles<br>'
                    'Please type the exact topic name (e.g., "World War II") for a detailed explanation.<br>'
                    'Reply with "back" to return to the history menu.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid choice. Please reply with 1, 2, 3, or 4, or type "menu" to return to the main menu.'}
    elif state == 'ancient_history_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'history_menu'
            return handle_history('start_history')
        elif user_input.lower() == 'mesopotamia':
            return {
                'topic': 'Mesopotamia',
                'response': (
                    '<b>Mesopotamia:</b><br>'
                    'Mesopotamia, located in modern-day Iraq, is often called the "Cradle of Civilization."<br>'
                    'Key concepts:<br>'
                    '- The invention of writing (cuneiform).<br>'
                    '- The Code of Hammurabi, one of the earliest legal codes.<br>'
                    '- The development of city-states like Ur and Babylon.<br>'
                    'Example: The Epic of Gilgamesh is one of the oldest known works of literature.<br>'
                    'Mesopotamia laid the foundation for many aspects of modern society.'
                )
            }
        elif user_input.lower() == 'ancient egypt':
            return {
                'topic': 'Ancient Egypt',
                'response': (
                    '<b>Ancient Egypt:</b><br>'
                    'Ancient Egypt was one of the world\'s earliest civilizations, known for its pyramids, pharaohs, and hieroglyphs.<br>'
                    'Key concepts:<br>'
                    '- The Nile River and its importance to agriculture.<br>'
                    '- The construction of the Great Pyramid of Giza.<br>'
                    '- The religious beliefs and practices, including mummification.<br>'
                    'Example: The Rosetta Stone was key to deciphering Egyptian hieroglyphs.<br>'
                    'Ancient Egypt is a fascinating study of early human civilization and culture.'
                )
            }
        elif user_input.lower() == 'ancient greece':
            return {
                'topic': 'Ancient Greece',
                'response': (
                    '<b>Ancient Greece:</b><br>'
                    'Ancient Greece was a civilization known for its contributions to philosophy, democracy, and the arts.<br>'
                    'Key concepts:<br>'
                    '- The city-states of Athens and Sparta.<br>'
                    '- The works of philosophers like Socrates, Plato, and Aristotle.<br>'
                    '- The Olympic Games and their cultural significance.<br>'
                    'Example: The Parthenon in Athens is a symbol of ancient Greek architecture.<br>'
                    'Ancient Greece laid the foundation for Western civilization.'
                )
            }
        elif user_input.lower() == 'ancient rome':
            return {
                'topic': 'Ancient Rome',
                'response': (
                    '<b>Ancient Rome:</b><br>'
                    'Ancient Rome was a powerful civilization that influenced law, government, and culture.<br>'
                    'Key concepts:<br>'
                    '- The Roman Republic and its transition to the Roman Empire.<br>'
                    '- The construction of infrastructure like roads and aqueducts.<br>'
                    '- The spread of Christianity in the Roman Empire.<br>'
                    'Example: The Colosseum in Rome is an iconic symbol of Roman engineering and entertainment.<br>'
                    'Ancient Rome\'s legacy continues to influence modern society.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the history menu.'}
    elif state == 'medieval_history_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'history_menu'
            return handle_history('start_history')
        elif user_input.lower() == 'feudalism':
            return {
                'topic': 'Feudalism',
                'response': (
                    '<b>Feudalism:</b><br>'
                    'Feudalism was a social and economic system in medieval Europe.<br>'
                    'Key concepts:<br>'
                    '- The hierarchy of lords, vassals, and serfs.<br>'
                    '- The exchange of land for military service.<br>'
                    '- The role of castles and knights.<br>'
                    'Example: The feudal system was dominant in Europe from the 9th to the 15th century.<br>'
                    'Feudalism shaped the political and social structure of medieval Europe.'
                )
            }
        elif user_input.lower() == 'the crusades':
            return {
                'topic': 'The Crusades',
                'response': (
                    '<b>The Crusades:</b><br>'
                    'The Crusades were a series of religious wars between Christians and Muslims for control of the Holy Land.<br>'
                    'Key concepts:<br>'
                    '- The First Crusade and the capture of Jerusalem.<br>'
                    '- The role of the Knights Templar.<br>'
                    '- The impact on European and Middle Eastern societies.<br>'
                    'Example: The First Crusade resulted in the establishment of the Kingdom of Jerusalem.<br>'
                    'The Crusades had a profound impact on European and Middle Eastern history.'
                )
            }
        elif user_input.lower() == 'the black death':
            return {
                'topic': 'The Black Death',
                'response': (
                    '<b>The Black Death:</b><br>'
                    'The Black Death was a devastating pandemic that swept through Europe in the 14th century.<br>'
                    'Key concepts:<br>'
                    '- The spread of the bubonic plague.<br>'
                    '- The social and economic impact on Europe.<br>'
                    '- The decline of feudalism.<br>'
                    'Example: The Black Death killed an estimated 25-30% of Europe\'s population.<br>'
                    'The Black Death had long-lasting effects on European society and economy.'
                )
            }
        elif user_input.lower() == 'the renaissance':
            return {
                'topic': 'The Renaissance',
                'response': (
                    '<b>The Renaissance:</b><br>'
                    'The Renaissance was a period of cultural and intellectual revival in Europe.<br>'
                    'Key concepts:<br>'
                    '- The revival of classical art, literature, and learning.<br>'
                    '- The works of artists like Leonardo da Vinci and Michelangelo.<br>'
                    '- The invention of the printing press by Johannes Gutenberg.<br>'
                    'Example: The Mona Lisa by Leonardo da Vinci is a masterpiece of Renaissance art.<br>'
                    'The Renaissance marked the transition from the Middle Ages to the modern era.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the history menu.'}
    elif state == 'modern_history_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'history_menu'
            return handle_history('start_history')
        elif user_input.lower() == 'the age of exploration':
            return {
                'topic': 'The Age of Exploration',
                'response': (
                    '<b>The Age of Exploration:</b><br>'
                    'The Age of Exploration was a period of global exploration and colonization.<br>'
                    'Key concepts:<br>'
                    '- The voyages of explorers like Christopher Columbus and Vasco da Gama.<br>'
                    '- The establishment of trade routes and colonies.<br>'
                    '- The impact on indigenous populations.<br>'
                    'Example: Columbus\'s voyage in 1492 led to the European colonization of the Americas.<br>'
                    'The Age of Exploration transformed global trade and culture.'
                )
            }
        elif user_input.lower() == 'the enlightenment':
            return {
                'topic': 'The Enlightenment',
                'response': (
                    '<b>The Enlightenment:</b><br>'
                    'The Enlightenment was an intellectual movement in the 17th and 18th centuries.<br>'
                    'Key concepts:<br>'
                    '- The emphasis on reason, science, and individual rights.<br>'
                    '- The works of philosophers like John Locke and Voltaire.<br>'
                    '- The influence on political revolutions.<br>'
                    'Example: The Declaration of Independence was influenced by Enlightenment ideas.<br>'
                    'The Enlightenment laid the foundation for modern democracy and human rights.'
                )
            }
        elif user_input.lower() == 'the french revolution':
            return {
                'topic': 'The French Revolution',
                'response': (
                    '<b>The French Revolution:</b><br>'
                    'The French Revolution was a period of radical social and political upheaval in France.<br>'
                    'Key concepts:<br>'
                    '- The storming of the Bastille and the rise of the Republic.<br>'
                    '- The Reign of Terror and the rise of Napoleon.<br>'
                    '- The Declaration of the Rights of Man and of the Citizen.<br>'
                    'Example: The French Revolution led to the rise of modern nationalism and democracy.<br>'
                    'The French Revolution had a profound impact on France and the world.'
                )
            }
        elif user_input.lower() == 'the industrial revolution':
            return {
                'topic': 'The Industrial Revolution',
                'response': (
                    '<b>The Industrial Revolution:</b><br>'
                    'The Industrial Revolution was a period of major industrialization in the 18th and 19th centuries.<br>'
                    'Key concepts:<br>'
                    '- The invention of the steam engine and mechanized production.<br>'
                    '- The growth of cities and the rise of the working class.<br>'
                    '- The impact on society and the environment.<br>'
                    'Example: The Industrial Revolution transformed economies from agrarian to industrial.<br>'
                    'The Industrial Revolution shaped the modern world.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the history menu.'}
    elif state == 'world_wars_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'history_menu'
            return handle_history('start_history')
        elif user_input.lower() == 'world war i':
            return {
                'topic': 'World War I',
                'response': (
                    '<b>World War I:</b><br>'
                    'World War I, also known as the Great War, was a global conflict from 1914 to 1918.<br>'
                    'Key concepts:<br>'
                    '- The assassination of Archduke Franz Ferdinand as a trigger.<br>'
                    '- Trench warfare and the use of new technologies.<br>'
                    '- The Treaty of Versailles and its consequences.<br>'
                    'Example: The Battle of the Somme was one of the deadliest battles in history.<br>'
                    'World War I led to significant political and social changes worldwide.'
                )
            }
        elif user_input.lower() == 'world war ii':
            return {
                'topic': 'World War II',
                'response': (
                    '<b>World War II:</b><br>'
                    'World War II was a global conflict from 1939 to 1945, involving most of the world\'s nations.<br>'
                    'Key concepts:<br>'
                    '- The Axis and Allies powers.<br>'
                    '- Major events like the Holocaust and the D-Day invasion.<br>'
                    '- The use of atomic bombs in Hiroshima and Nagasaki.<br>'
                    'Example: The D-Day invasion of Normandy was a turning point in the war.<br>'
                    'World War II had a profound impact on the world, leading to the establishment of the United Nations.'
                )
            }
        elif user_input.lower() == 'causes and consequences':
            return {
                'topic': 'Causes and Consequences',
                'response': (
                    '<b>Causes and Consequences:</b><br>'
                    'World Wars I and II were caused by a combination of political, economic, and social factors.<br>'
                    'Key concepts:<br>'
                    '- The Treaty of Versailles and its role in World War II.<br>'
                    '- The rise of fascism and totalitarian regimes.<br>'
                    '- The geopolitical changes after the wars.<br>'
                    'Example: The League of Nations was established after World War I but failed to prevent World War II.<br>'
                    'The world wars reshaped global politics and society.'
                )
            }
        elif user_input.lower() == 'major battles':
            return {
                'topic': 'Major Battles',
                'response': (
                    '<b>Major Battles:</b><br>'
                    'World Wars I and II involved many significant battles.<br>'
                    'Key concepts:<br>'
                    '- World War I: The Battle of the Somme, Verdun, and Gallipoli.<br>'
                    '- World War II: The Battle of Stalingrad, Normandy, and Midway.<br>'
                    '- The impact of these battles on the outcome of the wars.<br>'
                    'Example: The Battle of Stalingrad was a turning point in World War II.<br>'
                    'These battles were pivotal in shaping the course of history.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the history menu.'}
    else:
        return {'topic': 'Invalid State', 'response': 'Invalid state. Please start over.'}

def handle_language(state, user_input=None):
    if state == 'start_language':
        session_data['current_step'] = 'language_menu'
        return {
            'topic': 'Language Learning',
            'response': (
                'Language Learning Help 🗣️<br>'
                '1. <b>English</b><br>'
                '2. <b>Spanish</b><br>'
                '3. <b>French</b><br>'
                '4. <b>German</b><br>'
                'Please reply with the language number (1, 2, 3, or 4) to learn more!<br>'
                'Reply with "menu" to go back to the main menu.'
            )
        }
    elif state == 'language_menu':
        if user_input == '1':
            session_data['current_step'] = 'english_menu'
            return {
                'topic': 'English',
                'response': (
                    'English Learning Topics:<br>'
                    '- Grammar<br>'
                    '- Vocabulary<br>'
                    '- Pronunciation<br>'
                    '- Common Phrases<br>'
                    'Please type the exact topic name (e.g., "Grammar") for a detailed explanation.<br>'
                    'Reply with "back" to return to the language menu.'
                )
            }
        elif user_input == '2':
            session_data['current_step'] = 'spanish_menu'
            return {
                'topic': 'Spanish',
                'response': (
                    'Spanish Learning Topics:<br>'
                    '- Grammar<br>'
                    '- Vocabulary<br>'
                    '- Pronunciation<br>'
                    '- Common Phrases<br>'
                    'Please type the exact topic name (e.g., "Grammar") for a detailed explanation.<br>'
                    'Reply with "back" to return to the language menu.'
                )
            }
        elif user_input == '3':
            session_data['current_step'] = 'french_menu'
            return {
                'topic': 'French',
                'response': (
                    'French Learning Topics:<br>'
                    '- Grammar<br>'
                    '- Vocabulary<br>'
                    '- Pronunciation<br>'
                    '- Common Phrases<br>'
                    'Please type the exact topic name (e.g., "Grammar") for a detailed explanation.<br>'
                    'Reply with "back" to return to the language menu.'
                )
            }
        elif user_input == '4':
            session_data['current_step'] = 'german_menu'
            return {
                'topic': 'German',
                'response': (
                    'German Learning Topics:<br>'
                    '- Grammar<br>'
                    '- Vocabulary<br>'
                    '- Pronunciation<br>'
                    '- Common Phrases<br>'
                    'Please type the exact topic name (e.g., "Grammar") for a detailed explanation.<br>'
                    'Reply with "back" to return to the language menu.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid choice. Please reply with 1, 2, 3, or 4, or type "menu" to return to the main menu.'}
    elif state.endswith('_menu'):
        if user_input.lower() == 'back':
            session_data['current_step'] = 'language_menu'
            return handle_language('start_language')
        elif user_input.lower() in ['grammar', 'vocabulary', 'pronunciation', 'common phrases']:
            return {
                'topic': user_input.capitalize(),
                'response': (
                    f'<b>{user_input.capitalize()}:</b><br>'
                    f'Learning {user_input} is essential for mastering the language.<br>'
                    'Key concepts:<br>'
                    '- Understanding basic rules and structures.<br>'
                    '- Common mistakes and how to avoid them.<br>'
                    '- Tips for improving quickly.<br>'
                    'Example: Regular practice leads to better fluency.<br>'
                    f'Improving your {user_input} will greatly enhance your communication skills.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the language menu.'}
    else:
        return {'topic': 'Invalid State', 'response': 'Invalid state. Please start over.'}

def handle_homework(state, user_input=None):
    if state == 'start_homework':
        session_data['current_step'] = 'homework_menu'
        return {
            'topic': 'Homework Assistance',
            'response': (
                'Homework Assistance Help 📚<br>'
                '1. <b>Math Homework</b><br>'
                '2. <b>Science Homework</b><br>'
                '3. <b>History Homework</b><br>'
                '4. <b>Language Homework</b><br>'
                'Please reply with the topic number (1, 2, 3, or 4) to learn more!<br>'
                'Reply with "menu" to go back to the main menu.'
            )
        }
    elif state == 'homework_menu':
        if user_input == '1':
            session_data['current_step'] = 'math_homework_menu'
            return {
                'topic': 'Math Homework',
                'response': (
                    'Math Homework Topics:<br>'
                    '- Algebra<br>'
                    '- Geometry<br>'
                    '- Trigonometry<br>'
                    '- Calculus<br>'
                    'Please type the exact topic name (e.g., "Algebra") for a detailed explanation.<br>'
                    'Reply with "back" to return to the homework menu.'
                )
            }
        elif user_input == '2':
            session_data['current_step'] = 'science_homework_menu'
            return {
                'topic': 'Science Homework',
                'response': (
                    'Science Homework Topics:<br>'
                    '- Physics<br>'
                    '- Chemistry<br>'
                    '- Biology<br>'
                    '- Earth Science<br>'
                    'Please type the exact topic name (e.g., "Physics") for a detailed explanation.<br>'
                    'Reply with "back" to return to the homework menu.'
                )
            }
        elif user_input == '3':
            session_data['current_step'] = 'history_homework_menu'
            return {
                'topic': 'History Homework',
                'response': (
                    'History Homework Topics:<br>'
                    '- Ancient History<br>'
                    '- Medieval History<br>'
                    '- Modern History<br>'
                    '- World Wars<br>'
                    'Please type the exact topic name (e.g., "Ancient History") for a detailed explanation.<br>'
                    'Reply with "back" to return to the homework menu.'
                )
            }
        elif user_input == '4':
            session_data['current_step'] = 'language_homework_menu'
            return {
                'topic': 'Language Homework',
                'response': (
                    'Language Homework Topics:<br>'
                    '- English<br>'
                    '- Spanish<br>'
                    '- French<br>'
                    '- German<br>'
                    'Please type the exact topic name (e.g., "English") for a detailed explanation.<br>'
                    'Reply with "back" to return to the homework menu.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid choice. Please reply with 1, 2, 3, or 4, or type "menu" to return to the main menu.'}
    elif state == 'math_homework_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'homework_menu'
            return handle_homework('start_homework')
        elif user_input.lower() == 'algebra':
            return {
                'topic': 'Algebra Homework',
                'response': (
                    '<b>Algebra Homework:</b><br>'
                    'Algebra homework typically involves solving equations, simplifying expressions, and understanding functions.<br>'
                    'Key concepts:<br>'
                    '- Linear Equations<br>'
                    '- Quadratic Equations<br>'
                    '- Polynomials<br>'
                    'Example: Solve the equation 2x + 3 = 7.<br>'
                    'Step 1: Subtract 3 from both sides: 2x = 4.<br>'
                    'Step 2: Divide by 2: x = 2.<br>'
                    'Algebra is foundational for higher-level math and science courses.'
                )
            }
        elif user_input.lower() == 'geometry':
            return {
                'topic': 'Geometry Homework',
                'response': (
                    '<b>Geometry Homework:</b><br>'
                    'Geometry homework typically involves solving problems related to shapes, angles, and spatial relationships.<br>'
                    'Key concepts:<br>'
                    '- Euclidean Geometry<br>'
                    '- Coordinate Geometry<br>'
                    '- The Pythagorean Theorem<br>'
                    'Example: Find the area of a triangle with base 5 and height 10.<br>'
                    'Step 1: Use the formula Area = (base * height) / 2.<br>'
                    'Step 2: Calculate: (5 * 10) / 2 = 25.<br>'
                    'Geometry is essential for understanding spatial relationships and real-world applications.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the homework menu.'}
    elif state == 'science_homework_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'homework_menu'
            return handle_homework('start_homework')
        elif user_input.lower() == 'physics':
            return {
                'topic': 'Physics Homework',
                'response': (
                    '<b>Physics Homework:</b><br>'
                    'Physics homework typically involves solving problems related to motion, forces, energy, and waves.<br>'
                    'Key concepts:<br>'
                    '- Newton\'s Laws of Motion<br>'
                    '- Work, Energy, and Power<br>'
                    '- Electromagnetism<br>'
                    'Example: Calculate the force required to accelerate a 5 kg object at 2 m/s².<br>'
                    'Step 1: Use the formula F = ma.<br>'
                    'Step 2: Calculate: F = 5 * 2 = 10 N.<br>'
                    'Physics is fundamental for understanding the natural world and engineering applications.'
                )
            }
        elif user_input.lower() == 'chemistry':
            return {
                'topic': 'Chemistry Homework',
                'response': (
                    '<b>Chemistry Homework:</b><br>'
                    'Chemistry homework typically involves solving problems related to chemical reactions, stoichiometry, and the periodic table.<br>'
                    'Key concepts:<br>'
                    '- Balancing Chemical Equations<br>'
                    '- Stoichiometry<br>'
                    '- The Periodic Table<br>'
                    'Example: Balance the equation H2 + O2 → H2O.<br>'
                    'Step 1: Balance the hydrogen atoms: 2H2 + O2 → 2H2O.<br>'
                    'Step 2: Balance the oxygen atoms: 2H2 + O2 → 2H2O.<br>'
                    'Chemistry is essential for understanding matter and its interactions.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the homework menu.'}
    elif state == 'history_homework_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'homework_menu'
            return handle_homework('start_homework')
        elif user_input.lower() == 'ancient history':
            return {
                'topic': 'Ancient History Homework',
                'response': (
                    '<b>Ancient History Homework:</b><br>'
                    'Ancient history homework typically involves researching and writing about early civilizations.<br>'
                    'Key concepts:<br>'
                    '- Mesopotamia<br>'
                    '- Ancient Egypt<br>'
                    '- Ancient Greece<br>'
                    'Example: Write an essay on the contributions of Ancient Greece to modern democracy.<br>'
                    'Step 1: Research the political systems of Ancient Greece.<br>'
                    'Step 2: Discuss how these systems influenced modern democratic principles.<br>'
                    'Ancient history provides insights into the foundations of modern society.'
                )
            }
        elif user_input.lower() == 'medieval history':
            return {
                'topic': 'Medieval History Homework',
                'response': (
                    '<b>Medieval History Homework:</b><br>'
                    'Medieval history homework typically involves researching and writing about the Middle Ages.<br>'
                    'Key concepts:<br>'
                    '- Feudalism<br>'
                    '- The Crusades<br>'
                    '- The Black Death<br>'
                    'Example: Write an essay on the impact of the Black Death on European society.<br>'
                    'Step 1: Research the causes and effects of the Black Death.<br>'
                    'Step 2: Discuss how it changed social and economic structures.<br>'
                    'Medieval history is crucial for understanding the transition from the ancient to the modern world.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the homework menu.'}
    elif state == 'language_homework_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'homework_menu'
            return handle_homework('start_homework')
        elif user_input.lower() == 'english':
            return {
                'topic': 'English Homework',
                'response': (
                    '<b>English Homework:</b><br>'
                    'English homework typically involves writing essays, analyzing literature, and improving grammar.<br>'
                    'Key concepts:<br>'
                    '- Essay Writing<br>'
                    '- Literary Analysis<br>'
                    '- Grammar and Syntax<br>'
                    'Example: Write an essay on the theme of love in Shakespeare\'s "Romeo and Juliet."<br>'
                    'Step 1: Analyze the text for examples of love.<br>'
                    'Step 2: Discuss how these examples contribute to the overall theme.<br>'
                    'English homework helps develop critical thinking and communication skills.'
                )
            }
        elif user_input.lower() == 'spanish':
            return {
                'topic': 'Spanish Homework',
                'response': (
                    '<b>Spanish Homework:</b><br>'
                    'Spanish homework typically involves practicing grammar, vocabulary, and conversation.<br>'
                    'Key concepts:<br>'
                    '- Verb Conjugation<br>'
                    '- Vocabulary Building<br>'
                    '- Sentence Structure<br>'
                    'Example: Write a short paragraph in Spanish about your daily routine.<br>'
                    'Step 1: Use verbs in the present tense.<br>'
                    'Step 2: Include vocabulary related to daily activities.<br>'
                    'Spanish homework helps improve language proficiency and cultural understanding.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the homework menu.'}
    else:
        return {'topic': 'Invalid State', 'response': 'Invalid state. Please start over.'}

def handle_schedule(state, user_input=None):
    if state == 'start_schedule':
        session_data['current_step'] = 'schedule_menu'
        return {
            'topic': 'Study Scheduling',
            'response': (
                'Study Scheduling Help ⏰<br>'
                '1. <b>Create a Study Plan</b><br>'
                '2. <b>Time Management</b><br>'
                '3. <b>Focus Techniques</b><br>'
                '4. <b>Exam Preparation</b><br>'
                'Please reply with the topic number (1, 2, 3, or 4) to learn more!<br>'
                'Reply with "menu" to go back to the main menu.'
            )
        }
    elif state == 'schedule_menu':
        if user_input == '1':
            session_data['current_step'] = 'study_plan_menu'
            return {
                'topic': 'Create a Study Plan',
                'response': (
                    'Study Plan Topics:<br>'
                    '- Setting Goals<br>'
                    '- Prioritizing Tasks<br>'
                    '- Allocating Time<br>'
                    'Please type the exact topic name (e.g., "Setting Goals") for a detailed explanation.<br>'
                    'Reply with "back" to return to the schedule menu.'
                )
            }
        elif user_input == '2':
            session_data['current_step'] = 'time_management_menu'
            return {
                'topic': 'Time Management',
                'response': (
                    'Time Management Topics:<br>'
                    '- Prioritization<br>'
                    '- Scheduling<br>'
                    '- Avoiding Procrastination<br>'
                    'Please type the exact topic name (e.g., "Prioritization") for a detailed explanation.<br>'
                    'Reply with "back" to return to the schedule menu.'
                )
            }
        elif user_input == '3':
            session_data['current_step'] = 'focus_techniques_menu'
            return {
                'topic': 'Focus Techniques',
                'response': (
                    'Focus Techniques Topics:<br>'
                    '- Pomodoro Technique<br>'
                    '- Mindfulness<br>'
                    '- Eliminating Distractions<br>'
                    'Please type the exact topic name (e.g., "Pomodoro Technique") for a detailed explanation.<br>'
                    'Reply with "back" to return to the schedule menu.'
                )
            }
        elif user_input == '4':
            session_data['current_step'] = 'exam_preparation_menu'
            return {
                'topic': 'Exam Preparation',
                'response': (
                    'Exam Preparation Topics:<br>'
                    '- Study Strategies<br>'
                    '- Practice Tests<br>'
                    '- Stress Management<br>'
                    'Please type the exact topic name (e.g., "Study Strategies") for a detailed explanation.<br>'
                    'Reply with "back" to return to the schedule menu.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid choice. Please reply with 1, 2, 3, or 4, or type "menu" to return to the main menu.'}
    elif state == 'study_plan_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'schedule_menu'
            return handle_schedule('start_schedule')
        elif user_input.lower() == 'setting goals':
            return {
                'topic': 'Setting Goals',
                'response': (
                    '<b>Setting Goals:</b><br>'
                    'Setting goals is the first step in creating an effective study plan.<br>'
                    'Key concepts:<br>'
                    '- SMART Goals (Specific, Measurable, Achievable, Relevant, Time-bound)<br>'
                    '- Short-term vs. Long-term Goals<br>'
                    '- Tracking Progress<br>'
                    'Example: A SMART goal for studying could be "Complete 3 chapters of biology by Friday."<br>'
                    'Setting clear goals helps you stay focused and motivated.'
                )
            }
        elif user_input.lower() == 'prioritizing tasks':
            return {
                'topic': 'Prioritizing Tasks',
                'response': (
                    '<b>Prioritizing Tasks:</b><br>'
                    'Prioritizing tasks helps you focus on what\'s most important.<br>'
                    'Key concepts:<br>'
                    '- Urgent vs. Important Tasks<br>'
                    '- The Eisenhower Matrix<br>'
                    '- Breaking Down Large Tasks<br>'
                    'Example: Use the Eisenhower Matrix to categorize tasks into "Do Now," "Schedule," "Delegate," and "Don\'t Do."<br>'
                    'Prioritizing tasks ensures that you use your time effectively.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the schedule menu.'}
    elif state == 'time_management_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'schedule_menu'
            return handle_schedule('start_schedule')
        elif user_input.lower() == 'prioritization':
            return {
                'topic': 'Prioritization',
                'response': (
                    '<b>Prioritization:</b><br>'
                    'Prioritization is the process of deciding what tasks to focus on first.<br>'
                    'Key concepts:<br>'
                    '- Urgent vs. Important Tasks<br>'
                    '- The Eisenhower Matrix<br>'
                    '- Time Blocking<br>'
                    'Example: Use time blocking to allocate specific time slots for studying, breaks, and other activities.<br>'
                    'Prioritization helps you manage your time more effectively.'
                )
            }
        elif user_input.lower() == 'scheduling':
            return {
                'topic': 'Scheduling',
                'response': (
                    '<b>Scheduling:</b><br>'
                    'Scheduling involves planning your time to ensure you meet your goals.<br>'
                    'Key concepts:<br>'
                    '- Daily and Weekly Schedules<br>'
                    '- Time Blocking<br>'
                    '- Flexibility and Buffer Time<br>'
                    'Example: Create a weekly schedule that includes study sessions, breaks, and leisure activities.<br>'
                    'Scheduling helps you stay organized and on track.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the schedule menu.'}
    elif state == 'focus_techniques_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'schedule_menu'
            return handle_schedule('start_schedule')
        elif user_input.lower() == 'pomodoro technique':
            return {
                'topic': 'Pomodoro Technique',
                'response': (
                    '<b>Pomodoro Technique:</b><br>'
                    'The Pomodoro Technique is a time management method that breaks work into intervals.<br>'
                    'Key concepts:<br>'
                    '- Work for 25 minutes, then take a 5-minute break.<br>'
                    '- After 4 intervals, take a longer break (15-30 minutes).<br>'
                    '- Use a timer to track intervals.<br>'
                    'Example: Use the Pomodoro Technique to study for 25 minutes, then take a 5-minute break.<br>'
                    'This technique helps maintain focus and prevent burnout.'
                )
            }
        elif user_input.lower() == 'mindfulness':
            return {
                'topic': 'Mindfulness',
                'response': (
                    '<b>Mindfulness:</b><br>'
                    'Mindfulness is the practice of being present and fully engaged in the moment.<br>'
                    'Key concepts:<br>'
                    '- Meditation<br>'
                    '- Deep Breathing<br>'
                    '- Reducing Distractions<br>'
                    'Example: Practice mindfulness by focusing on your breath for 5 minutes before starting a study session.<br>'
                    'Mindfulness helps improve concentration and reduce stress.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the schedule menu.'}
    elif state == 'exam_preparation_menu':
        if user_input.lower() == 'back':
            session_data['current_step'] = 'schedule_menu'
            return handle_schedule('start_schedule')
        elif user_input.lower() == 'study strategies':
            return {
                'topic': 'Study Strategies',
                'response': (
                    '<b>Study Strategies:</b><br>'
                    'Effective study strategies can improve your exam performance.<br>'
                    'Key concepts:<br>'
                    '- Active Recall<br>'
                    '- Spaced Repetition<br>'
                    '- Practice Tests<br>'
                    'Example: Use active recall by testing yourself on key concepts instead of passively reading notes.<br>'
                    'Study strategies help you retain information and perform better on exams.'
                )
            }
        elif user_input.lower() == 'practice tests':
            return {
                'topic': 'Practice Tests',
                'response': (
                    '<b>Practice Tests:</b><br>'
                    'Practice tests are a valuable tool for exam preparation.<br>'
                    'Key concepts:<br>'
                    '- Simulating Exam Conditions<br>'
                    '- Identifying Weak Areas<br>'
                    '- Time Management<br>'
                    'Example: Take a practice test under timed conditions to simulate the actual exam.<br>'
                    'Practice tests help you build confidence and improve your performance.'
                )
            }
        else:
            return {'topic': 'Invalid Option', 'response': 'Invalid topic. Please type the exact topic name or reply with "back" to return to the schedule menu.'}
    else:
        return {'topic': 'Invalid State', 'response': 'Invalid state. Please start over.'}

def analyze_query(query):
    query = query.lower()
    current_step = session_data.get("current_step", "start")

    if query == "menu":
        return chatbot_greeting()

    if current_step == "start":
        if query == "a":
            return handle_math("start_math")
        elif query == "b":
            return handle_science("start_science")
        elif query == "c":
            return handle_history("start_history")
        elif query == "d":
            return handle_language("start_language")
        elif query == "e":
            return handle_homework("start_homework")
        elif query == "f":
            return handle_schedule("start_schedule")
        else:
            return {
                'topic': 'Invalid Option',
                'response': 'Please choose an option by replying with A, B, C, D, E, or F, or type "menu" to return to the main menu.'
            }
    elif current_step == "math_menu":
        if query in ["1", "2", "3", "4"]:
            return handle_math('math_menu', query)
        else:
            return {'topic': 'Invalid Option', 'response': 'Please reply with 1, 2, 3, or 4, or type "menu" to return to the main menu.'}
    elif current_step == "science_menu":
        if query in ["1", "2", "3", "4"]:
            return handle_science('science_menu', query)
        else:
            return {'topic': 'Invalid Option', 'response': 'Please reply with 1, 2, 3, or 4, or type "menu" to return to the main menu.'}
    elif current_step == "history_menu":
        if query in ["1", "2", "3", "4"]:
            return handle_history('history_menu', query)
        else:
            return {'topic': 'Invalid Option', 'response': 'Please reply with 1, 2, 3, or 4, or type "menu" to return to the main menu.'}
    elif current_step == "language_menu":
        if query in ["1", "2", "3", "4"]:
            return handle_language('language_menu', query)
        else:
            return {'topic': 'Invalid Option', 'response': 'Please reply with 1, 2, 3, or 4, or type "menu" to return to the main menu.'}
    elif current_step == "homework_menu":
        if query in ["1", "2", "3", "4"]:
            return handle_homework('homework_menu', query)
        else:
            return {'topic': 'Invalid Option', 'response': 'Please reply with 1, 2, 3, or 4, or type "menu" to return to the main menu.'}
    elif current_step == "schedule_menu":
        if query in ["1", "2", "3", "4"]:
            return handle_schedule('schedule_menu', query)
        else:
            return {'topic': 'Invalid Option', 'response': 'Please reply with 1, 2, 3, or 4, or type "menu" to return to the main menu.'}
    elif current_step == "algebra_menu":
        return handle_math('algebra_menu', query)
    elif current_step == "geometry_menu":
        return handle_math('geometry_menu', query)
    elif current_step == "trigonometry_menu":
        return handle_math('trigonometry_menu', query)
    elif current_step == "calculus_menu":
        return handle_math('calculus_menu', query)
    elif current_step == "physics_menu":
        return handle_science('physics_menu', query)
    elif current_step == "chemistry_menu":
        return handle_science('chemistry_menu', query)
    elif current_step == "biology_menu":
        return handle_science('biology_menu', query)
    elif current_step == "earth_science_menu":
        return handle_science('earth_science_menu', query)
    elif current_step == "ancient_history_menu":
        return handle_history('ancient_history_menu', query)
    elif current_step == "medieval_history_menu":
        return handle_history('medieval_history_menu', query)
    elif current_step == "modern_history_menu":
        return handle_history('modern_history_menu', query)
    elif current_step == "world_wars_menu":
        return handle_history('world_wars_menu', query)
    elif current_step == "english_menu":
        return handle_language('english_menu', query)
    elif current_step == "spanish_menu":
        return handle_language('spanish_menu', query)
    elif current_step == "french_menu":
        return handle_language('french_menu', query)
    elif current_step == "german_menu":
        return handle_language('german_menu', query)
    elif current_step == "math_homework_menu":
        return handle_homework('math_homework_menu', query)
    elif current_step == "science_homework_menu":
        return handle_homework('science_homework_menu', query)
    elif current_step == "history_homework_menu":
        return handle_homework('history_homework_menu', query)
    elif current_step == "language_homework_menu":
        return handle_homework('language_homework_menu', query)
    elif current_step == "study_plan_menu":
        return handle_schedule('study_plan_menu', query)
    elif current_step == "time_management_menu":
        return handle_schedule('time_management_menu', query)
    elif current_step == "focus_techniques_menu":
        return handle_schedule('focus_techniques_menu', query)
    elif current_step == "exam_preparation_menu":
        return handle_schedule('exam_preparation_menu', query)
    else:
        return {
            'topic': 'General Assistance',
            'response': 'I am here to help! Please choose a subject or ask a question. Reply with "menu" to return to the main menu.'
        }