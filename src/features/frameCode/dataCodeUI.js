import { faAlignLeft, faRankingStar, faClock } from '@fortawesome/free-solid-svg-icons';

export const defaultValueEditor ={
    "c":"#include <stdio.h> \n\n\n int main() {\n    // Complete the code.\n    return 0;\n}\n",
    "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Complete the code.\n    return 0;\n}\n",
    "java": "import java.io.*;\n\nclass Main {\n\n    public static void main(String[] args) {\n        // Your code goes here\n   }\n}\n",
    "py": "# Enter your code here. Read input from STDIN. Print output to STDOUT",
    "cs": "using System;\nnamespace HelloWorld\n{\n\tclass Program\n\t{\n\t\tstatic void Main(string[] args)\n\t\t{\n\t\t\tConsole.WriteLine(\"Hello World!\");\n\t\t}\n\t}\n}"
} 
export const modeEditor = {
    "c":"c_cpp",
    "cpp": "c_cpp",
    "java": "java",
    "py": "python",
    "cs":"csharp"
}

export const navLeftItems = [
    {
        icon: faAlignLeft,
        name: "content"
    },
    {
        icon: faRankingStar,
        name: "rank"
    },
    {
        icon: faClock,
        name: "history"
    }
]
