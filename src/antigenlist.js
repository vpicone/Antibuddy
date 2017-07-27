const suggestions = [
    {
        label: "A",
        name: "A Antigen",
        system: "ABO",
        isbt: "001.001",
        comments: "Serum from group A patients contains naturally occuring anti-B.",
        features: {
            "Enzyme reactivity": "Resistant to all.",
            "Antigen expression": "Weak on cord cells. Altered in some disease states",
            "Immunoglobulin class": "IgM; IgG",
            "Optimal testing technique": "Room temp or below",
            "Neutralization": "Saliva from A secretors",
            "Complement Binding": "Yes; some hemolytic",
            "Transfusion Reactions": "None to severe, immediate/delayed, intravascular/extravascular",
            "Hemolytic Disease of the Newborn": "None to moderate",
            "Autoantibody formation": "Rare"
        },
        occurence: {
            c: "43%",
            b: "27%",
            a: "28%",
            m: "28%",
            sai: "0%"
        }
    },
    {
        label: "B",
        system: "ABO",
        isbt: "001.002",
        comments: "Serum from group A patients contains naturally occuring anti-B.",
        features: {
            "Enzyme reactivity": "Resistant to all.",
            "Antigen expression": "Weak on cord cells. Altered in some disease states",
            "Immunoglobulin class": "IgM; IgG",
            "Optimal testing technique": "Room temp or below",
            "Neutralization": "Saliva from B secretors",
            "Complement Binding": "Yes; some hemolytic",
            "Transfusion Reactions": "None to severe, immediate/delayed, intravascular/extravascular",
            "Hemolytic Disease of the Newborn": "None to moderate",
            "Autoantibody formation": "Rare"
        },
        occurence: {
            c: "9%",
            b: "20%",
            a: "27%",
            m: "13%",
            sai: "0%"
        }
    },
    {
        label: "A1",
        system: "ABO",
        isbt: "001.004",
        comments: `Transferase activity in A1 individuals is 5-10 times higher than A2 (A1-) individauls. 
                   Anti-A1 can be prepared from Dolichos biflorus.`,
        features: {
            "Enzyme reactivity": "Resistant",
            "Antigen expression": "Weakly developed on cords.",
            "Immunoglobulin class": "IgM more common than IgG",
            "Optimal testing technique": "RT or below",
            "Neutralization": "Saliva from A secretors",
            "Complement Binding": "Rare",
            "Transfusion Reactions": "None to mild, delayed",
            "Hemolytic Disease of the Newborn": "No",
            "Autoantibody formation": "Rare",
        },
        occurence: {
            c: "34%",
            b: "19%",
            a: "27%",
        },
    }
]

export default suggestions;