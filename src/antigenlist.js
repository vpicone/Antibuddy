const suggestions = [
    {
        label: "A",
        name: "A Antigen",
        system: "ABO",
        isbt: "001.001",
        enzymes: "Resistant to all.",
        expression: {
            cord: "Weak",
            altered: "Weak in some variants and diseases"
        },
        occurence: {
            c: "43%",
            b: "27%",
            a: "28%",
            m: "28%",
            sai: "0%"
        },
        igclass: "IgM; IgG",
        technique: "RT or below",
        neutralization: "Saliva from A secretors",
        complement: "Yes; some hemolytic",
        txr: ["None to severe", "immediate", "delayed", "intravascular", "extravascular"],
        hdn: "None to moderate",
        auto: "Rare",
        comments: "Serum from group A patients contains naturally occuring anti-B"
    },
    {
        label: "B",
        system: "ABO",
        isbt: "001.002",
        enzymes: "Resistant",
        expression: {
            cord: "Weak",
            altered: "Weak in some variants and diseases"
        },
        occurence: {
            c: "9%",
            b: "20%",
            a: "27%",
            m: "13%",
            sai: "0%"
        },
        igclass: "IgM; IgG",
        technique: "RT or below",
        neutralization: "Saliva from B secretors",
        complement: "Yes; some hemolytic",
        txr: ["None to severe", "Immediate", "Delayed", "Intravascular", "Extravascular"],
        hdn: "None to moderate",
        auto: "Rare",
        comments: "Serum from group B patients contains naturally occuring anti-A"
    },
    {
        label: "A1",
        system: "ABO",
        isbt: "001.004",
        enzymes: "Resistant",
        expression: {
            cord: "Weak"
        },
        occurence: {
            c: "34%",
            b: "19%",
            a: "27%",
        },
        igclass: "IgM more common than IgG",
        technique: "RT or below",
        neutralization: "Saliva from A secretors",
        complement: "Rare",
        txr: ["None to mild", "Delayed"],
        hdn: "No",
        auto: "Rare",
        comments: "Transferase activity in A<sub>1</sub> individuals is 5-10 times higher than A<sub>2</sub> (A<sub>1</sub>-) individauls anti-A1 can be prepared from Dolichos biflorus."
    }
]

export default suggestions;