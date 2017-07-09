
var perOptions = [
    {
        type: 'option',
        value: 'false',
        text: 'no time period'
    },
    {
        type: 'option',
        value: 'year', 
        text: 'per year' 
    },
    { 
        type: 'option',
        value: 'day', 
        text: 'per day'
    },
    { 
        type: 'option',
        value: 'min', 
        text: 'per min'
    },
    { 
        type: 'option',
        value: 'sec', 
        text: 'per second'
    }
];

var unitOptions = [
    {
        type: 'option',
        value: 'kg',
        text: 'kg'
    },
    {
        type: 'option',
        value: 't', 
        text: 'tonnes' 
    },
    { 
        type: 'option',
        value: 'gt', 
        text: 'gigatonnes'
    }
];

var interfaceNodes = [
    {
        type: 'div',
        id: 'volContainer'
    },
    {
        type: 'div',
        id: 'infoContainer',
        children: [
            {
                type: 'form',
                className: 'ecw-controls',
                children: [
                    {
                        type: 'h2',
                        text: 'Comparison data input'
                    },
                    {
                        type: 'div',
                        className: 'ecw-form-row',
                        children: [
                            {
                                type: 'label',
                                for: 'Gas',
                                text: 'Gas:'
                            },
                            {
                                type: 'select',
                                id: 'Gas',
                                children: [
                                    {
                                        type: 'option',
                                        value: '1.98',
                                        text: 'Carbon dioxide'
                                    },
                                    {
                                        type: 'option',
                                        value: '1.14', 
                                        text: 'Carbon monoxide' 
                                    },
                                    { 
                                        type: 'option',
                                        value: '1000', 
                                        text: 'Water'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'div',
                        className: 'ecw-form-row',
                        children: [
                            {
                                type: 'label',
                                for: 'MassNum',
                                text: 'Number of masses to compare:'
                            },
                            {
                                type: 'select',
                                id: 'MassNum',
                                children: [
                                    {
                                        type: 'option',
                                        text: '1'
                                    },
                                    {
                                        type: 'option',
                                        text: '2' 
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'div',
                        id: 'Mass1Div',
                        className: 'ecw-form-row',
                        children: [
                            {
                                type: 'label',
                                for: 'Mass1',
                                text: 'Mass 1:'
                            },
                            {
                                type: 'input',
                                inputType: 'number',
                                id: 'Mass1',
                                className: 'ecw-mass-number-input',
                                min: 1,
                                required: true
                            },
                            {
                                type: 'select',
                                id: 'Mass1Unit',
                                children: unitOptions
                            },
                            {
                                type: 'select',
                                id: 'Mass1Per',
                                children: perOptions
                            }
                        ]
                    },
                    {
                        type: 'div',
                        id: 'Mass2Div',
                        className: 'ecw-form-row',
                        display: false,
                        children: [
                            {
                                type: 'label',
                                for: 'Mass2',
                                text: 'Mass 2:'
                            },
                            {
                                type: 'input',
                                inputType: 'number',
                                id: 'Mass2',
                                className: 'ecw-mass-number-input',
                                min: 1,
                                required: true
                            },
                            {
                                type: 'select',
                                id: 'Mass2Unit',
                                children: unitOptions
                            },
                            {
                                type: 'select',
                                id: 'Mass2Per',
                                children: perOptions
                            }
                        ]
                    },
                    {
                        type: 'div',
                        className: 'ecw-form-row',
                        children: [
                            {
                                type: 'button',
                                id: 'submit',
                                className: 'inactive',
                                inputType: 'button',
                                text: 'Submit'
                            }
                        ]
                    }
                ]
            },
            {
                type: 'div',
                className: 'ecw-form-row',
                children: [
                    {
                        type: 'button',
                        id: 'ecw-btn-scale',
                        className: 'active',
                        text: 'Include scaling object'
                    }
                ]
            },
            {
                type: 'div',
                id: 'buttonContainer',
                children: [
                    {
                        type: 'button',
                        id: 'sec',
                        className: 'timescale inactive',
                        text: 'per second'
                    },
                    {
                        type: 'button',
                        id: 'min',
                        className: 'timescale inactive',
                        text: 'per minute'
                    },
                    {
                        type: 'button',
                        id: 'day',
                        className: 'timescale inactive',
                        text: 'per day'
                    },
                    {
                        type: 'button',
                        id: 'year',
                        className: 'timescale inactive',
                        text: 'per year'
                    }
                ]
            },
            {
                type: 'div',
                id: 'stats',
                children: [
                    {
                        type: 'div',
                        id: 'stats1',
                        className: 'ecw-stat-box'
                    },
                    {
                        type: 'div',
                        id: 'stats2',
                        className: 'ecw-stat-box'
                    }
                ]
            },
            {
                type: 'div',
                id: 'universalStats',
                className: 'ecw-stat-box'
            },
            {
                type: 'p',
                id: 'downloadZip'
            }
        ]
    }
];
