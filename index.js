var $6gDYh$reactjsxruntime = require("react/jsx-runtime");
var $6gDYh$reactdomclient = require("react-dom/client");
var $6gDYh$react = require("react");







const $03b11640435a38d3$export$ed692cabb252e59b = (formData)=>{
    return formData.numberOfSecurities !== "" && formData.hoursPerDay !== "" && formData.frequency !== "" && formData.numberOfSecuritiesError === "" && formData.hoursPerDayError === "";
};
const $03b11640435a38d3$export$2096bae78ecda911 = (event, formData, setFormData)=>{
    const { name: name, value: value } = event.target;
    if (name === "numberOfSecurities") {
        const numberOfSecurities = parseInt(value, 10);
        let errorMessage = "";
        if (isNaN(numberOfSecurities) || numberOfSecurities < 1000 || numberOfSecurities > 99999) errorMessage = "Please enter a number between 1000 and 99999";
        setFormData({
            ...formData,
            [name]: value,
            numberOfSecuritiesError: errorMessage
        });
    } else if (name === "hoursPerDay") {
        const hoursPerDay = parseInt(value, 10);
        let errorMessage = "";
        if (isNaN(hoursPerDay) || hoursPerDay < 1 || hoursPerDay > 24) errorMessage = "Please enter a number between 1 and 24";
        setFormData({
            ...formData,
            [name]: value,
            hoursPerDayError: errorMessage
        });
    } else setFormData({
        ...formData,
        [name]: value
    });
};
const $03b11640435a38d3$export$1cfd25f8aa83d40b = (formData, setFormData, setCalculatedFee)=>{
    const { numberOfSecurities: numberOfSecurities, frequency: frequency, hoursPerDay: hoursPerDay } = formData;
    const requestsPerHour = 60 / parseInt(frequency, 10);
    const totalRequestsPerDay = requestsPerHour * parseInt(hoursPerDay, 10);
    const totalQuotesPerDay = totalRequestsPerDay * parseInt(numberOfSecurities, 10);
    const totalQuotesPerMonth = totalQuotesPerDay * 20;
    setFormData((prevState)=>({
            ...prevState,
            requestsPerDay: totalRequestsPerDay,
            quotesPerDay: totalQuotesPerDay,
            quotesPerMonth: totalQuotesPerMonth
        }));
    const matchingQuote = $03b11640435a38d3$export$4c1635955a8d01a2.find((quote, index)=>{
        const nextQuote = $03b11640435a38d3$export$4c1635955a8d01a2[index];
        return totalQuotesPerMonth <= quote.quotes_per_month || nextQuote && totalQuotesPerMonth < nextQuote.quotes_per_month;
    });
    let fee = 0;
    if (matchingQuote) fee = matchingQuote.fee;
    else if (totalQuotesPerMonth > 10000000) {
        const maxQuote = $03b11640435a38d3$export$4c1635955a8d01a2[$03b11640435a38d3$export$4c1635955a8d01a2.length - 1];
        fee = maxQuote.fee;
    }
    setCalculatedFee(fee);
};
const $03b11640435a38d3$export$4c1635955a8d01a2 = [
    {
        "quotes_per_day": 12500,
        "quotes_per_month": 250000,
        "fee": 1000
    },
    {
        "quotes_per_day": 25000,
        "quotes_per_month": 500000,
        "fee": 1500
    },
    {
        "quotes_per_day": 50000,
        "quotes_per_month": 1000000,
        "fee": 2500
    },
    {
        "quotes_per_day": 100000,
        "quotes_per_month": 2000000,
        "fee": 4000
    },
    {
        "quotes_per_day": 250000,
        "quotes_per_month": 5000000,
        "fee": 6000
    },
    {
        "quotes_per_day": 500000,
        "quotes_per_month": 10000000,
        "fee": 8000
    }
];


const $cd89d89a82b0c7fa$var$PricingCalculator = ()=>{
    const initialState = {
        numberOfSecurities: "",
        frequency: "1",
        hoursPerDay: "",
        requestsPerDay: 0,
        quotesPerDay: 0,
        quotesPerMonth: 0
    };
    const [formData, setFormData] = (0, $6gDYh$react.useState)(initialState);
    const [formValid, setFormValid] = (0, $6gDYh$react.useState)(false);
    const [calculatedFee, setCalculatedFee] = (0, $6gDYh$react.useState)(0);
    (0, $6gDYh$react.useEffect)(()=>{
        const isValid = (0, $03b11640435a38d3$export$ed692cabb252e59b)(formData);
        setFormValid(isValid);
        if (isValid) (0, $03b11640435a38d3$export$1cfd25f8aa83d40b)(formData, setFormData, setCalculatedFee);
        else {
            setFormData((prevState)=>({
                    ...prevState,
                    quotesPerMonth: 0
                }));
            setCalculatedFee(0);
        }
    }, [
        formData.numberOfSecurities,
        formData.frequency,
        formData.hoursPerDay
    ]);
    return /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("div", {
        className: "flex h-screen",
        children: /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsxs)("div", {
            className: "flex flex-col w-full",
            children: [
                /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("div", {
                    className: "flex m-6 justify-center sm:text-[30px] text-[25px] font-bold text-[#0d2c8a] underline",
                    children: /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("p", {
                        children: "Pricing Calculator For EDF Snapshot"
                    })
                }),
                /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("div", {
                    className: "flex w-full gap-8 p-[30px] justify-center",
                    children: /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsxs)("div", {
                        className: "flex flex-col bg-[#f5f7f9] max-h-[calc(100vh-150px)] max-w-[600px] w-full rounded-xl shadow-xl",
                        children: [
                            /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("div", {
                                className: "m-4",
                                children: /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("p", {
                                    className: "text-[30px] font-bold",
                                    children: "Calculator"
                                })
                            }),
                            /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsxs)("div", {
                                className: "flex flex-col m-5 gap-y-8 overflow-y-auto max-h-[calc(100vh-226px)] pr-[10px]",
                                children: [
                                    /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("label", {
                                        className: "font-bold text-[17px] border-b-4 border-b-[#ccc]",
                                        children: /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("p", {
                                            className: "mb-2",
                                            children: "Number of Securities"
                                        })
                                    }),
                                    /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("input", {
                                        className: `w-full border border-black rounded-md p-[8px] ${formData.numberOfSecuritiesError && "border-red-500"}`,
                                        placeholder: "Enter number of securities",
                                        type: "number",
                                        name: "numberOfSecurities",
                                        value: formData.numberOfSecurities,
                                        onChange: (e)=>(0, $03b11640435a38d3$export$2096bae78ecda911)(e, formData, setFormData),
                                        min: 1000,
                                        max: 99999
                                    }),
                                    formData.numberOfSecuritiesError && /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("p", {
                                        className: "text-red-500 text-[15px] mt-[-18px]",
                                        children: formData.numberOfSecuritiesError
                                    }),
                                    /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("label", {
                                        className: "font-bold text-[17px] border-b-4 border-b-[#ccc]",
                                        children: /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("p", {
                                            className: "mb-2",
                                            children: "Frequency of Request in Minutes"
                                        })
                                    }),
                                    /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsxs)("select", {
                                        className: "w-full border border-black rounded-md p-[8px]",
                                        name: "frequency",
                                        value: formData.frequency,
                                        onChange: (e)=>(0, $03b11640435a38d3$export$2096bae78ecda911)(e, formData, setFormData),
                                        children: [
                                            /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("option", {
                                                value: "1",
                                                children: "1 Minute"
                                            }),
                                            /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("option", {
                                                value: "5",
                                                children: "5 Minutes"
                                            }),
                                            /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("option", {
                                                value: "15",
                                                children: "15 Minutes"
                                            }),
                                            /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("option", {
                                                value: "60",
                                                children: "60 Minutes"
                                            }),
                                            /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("option", {
                                                value: "120",
                                                children: "120 Minutes"
                                            }),
                                            /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("option", {
                                                value: "480",
                                                children: "480 Minutes"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("label", {
                                        className: "font-bold text-[17px] border-b-4 border-b-[#ccc]",
                                        children: /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("p", {
                                            className: "mb-2",
                                            children: "Hours per day Requesting Quotes"
                                        })
                                    }),
                                    /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("input", {
                                        className: `w-full border border-black rounded-md p-[8px] ${formData.hoursPerDayError && "border-red-500"}`,
                                        placeholder: "Enter hours per day requesting quotes",
                                        type: "number",
                                        name: "hoursPerDay",
                                        value: formData.hoursPerDay,
                                        onChange: (e)=>(0, $03b11640435a38d3$export$2096bae78ecda911)(e, formData, setFormData),
                                        min: 1,
                                        max: 24
                                    }),
                                    formData.hoursPerDayError && /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("p", {
                                        className: "text-red-500 text-[15px] mt-[-18px]",
                                        children: formData.hoursPerDayError
                                    }),
                                    /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("div", {
                                        className: "flex flex-col justify-center items-center m-5 gap-10",
                                        children: /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsxs)("div", {
                                            className: "flex xl:flex-row flex-col gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsxs)("div", {
                                                    className: "flex flex-col p-[10px] bg-white border border-[#007bff] w-[164px] font-bold rounded-md justify-center items-center text-[20px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("p", {
                                                            className: "font-semibold",
                                                            children: formData.quotesPerMonth
                                                        }),
                                                        /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("p", {
                                                            children: "Quotes/month"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsxs)("div", {
                                                    className: "flex flex-col p-[10px] bg-white border border-[#007bff] w-[164px] font-bold rounded-md justify-center items-center text-[20px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsxs)("p", {
                                                            className: "font-semibold",
                                                            children: [
                                                                "$",
                                                                calculatedFee
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("p", {
                                                            children: "Fee"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    });
};
var $cd89d89a82b0c7fa$export$2e2bcd8739ae039 = $cd89d89a82b0c7fa$var$PricingCalculator;


const $a0445abc59297e28$var$App = ()=>{
    return /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)("div", {
        children: /*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)((0, $cd89d89a82b0c7fa$export$2e2bcd8739ae039), {})
    });
};
var $a0445abc59297e28$export$2e2bcd8739ae039 = $a0445abc59297e28$var$App;


const $d6ba8da31e566df5$var$container = document.getElementById("app");
const $d6ba8da31e566df5$var$root = (0, $6gDYh$reactdomclient.createRoot)($d6ba8da31e566df5$var$container);
$d6ba8da31e566df5$var$root.render(/*#__PURE__*/ (0, $6gDYh$reactjsxruntime.jsx)((0, $a0445abc59297e28$export$2e2bcd8739ae039), {}));


