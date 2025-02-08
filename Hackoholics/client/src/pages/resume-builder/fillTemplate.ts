import fs from 'fs';
import { join } from 'path-browserify';
import { ResumeData } from './data';  // Import the ResumeData interface and sample data

// Function to replace placeholders in the LaTeX template
export function fillTemplate(template: string, data: ResumeData): string {
  let filledTemplate = template;

  // Replace placeholders with data from the ResumeData
  filledTemplate = filledTemplate.replace('{{name}}', data.name);
  filledTemplate = filledTemplate.replace('{{contact.email}}', data.contact.email);
  filledTemplate = filledTemplate.replace('{{contact.phone}}', data.contact.phone);
  filledTemplate = filledTemplate.replace('{{contact.linkedin}}', data.contact.linkedin);
  filledTemplate = filledTemplate.replace('{{summary}}', data.summary);

  // Replace Education datas
  let educationStr = '';
  data.education.forEach(edu => {
    educationStr += `
  \\textbf{${edu.degree}} \\hfill ${edu.institution} \\
  ${edu.year} \\
`;
  });
  filledTemplate = filledTemplate.replace('{{#education}}', educationStr).replace('{{/education}}', '');

  // Replace Experience data
  let experienceStr = '';
  data.experience.forEach(exp => {
    experienceStr += `
  \\textbf{${exp.title}} \\hfill ${exp.company} \\
  ${exp.years} \\
  ${exp.description} \\
`;
  });
  filledTemplate = filledTemplate.replace('{{#experience}}', experienceStr).replace('{{/experience}}', '');

  // Replace Skills data
  let skillsStr = '';
  data.skills.forEach(skill => {
    skillsStr += `
  \\textbf{${skill}} \\
`;
  });
  filledTemplate = filledTemplate.replace('{{#skills}}', skillsStr).replace('{{/skills}}', '');
  console.log(filledTemplate);
  return filledTemplate;
}

// Function to load the template and fill with data
export async function generateLatexWithData(resumeData: ResumeData): Promise<string> {
  fillTemplate(`\\documentclass[10pt, letterpaper]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{titlesec}
\\usepackage{hyperref}
\\usepackage{enumitem}

\\begin{document}

\\begin{center}
    {\\huge \\textbf{{{name}}}} \\
    {{contact.email}} | {{contact.phone}} | \\href{https://linkedin.com/in/{{contact.linkedin}}}{LinkedIn}
\\end{center}

\\section*{Summary}
{{summary}}

\\section*{Education}
{{#education}}
\\textbf{{{degree}}} \\hfill {{{institution}}} \\
{{{year}}} \\
{{/education}}

\\section*{Experience}
{{#experience}}
\\textbf{{{title}}} \\hfill {{{company}}} \\
{{{years}}} \\
{{{description}}} \\
{{/experience}}

\\section*{Skills}
\\begin{itemize}
{{#skills}}
    \\item {{{.}}}
{{/skills}}
\\end{itemize}

\\end{document}
`, resumeData);
  try {
    const templatePath = join(process.cwd(), 'public/templates/template1.tex');
    const template = fs.readFileSync(templatePath, 'utf8');  // Read template file
    const outputDir = join(process.cwd(), 'public/templates/filledlatex');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = join(outputDir, 'filledTemplate.tex');
    // Fill the template with resume data
    const filledLatex = fillTemplate(template, resumeData);
    fs.writeFileSync(outputPath, filledLatex, 'utf8');

    return filledLatex;
  } catch (error) {
    console.error('Error generating LaTeX with data:', error);
    throw error;
  }
}

// Usage Example: Generate LaTeX string with filled data
// generateLatexWithData(resumeData).then(filledLatex => {
//   console.log(filledLatex);  // Print or save the filled LaTeX string
// });
