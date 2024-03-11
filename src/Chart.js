import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';

// Изначальные значения
const INITIAL_B = 0.5; // магнитная индукция
const INITIAL_F = 1; // частота вращения
const INITIAL_R = 10; // сопротивление
const INITIAL_A = 1; // площадь контура

function Chart() {
    const [B, setB] = useState(INITIAL_B);
    const [f, setF] = useState(INITIAL_F);
    const [R, setR] = useState(INITIAL_R);
    const [A, setA] = useState(INITIAL_A);
    const [dataE, setDataE] = useState([]);
    const [dataI, setDataI] = useState([]);

    const size = 6.28;
    const points = 314;
    const step = size / points;
    useEffect(() => {
        const newDataE = Array.from({length: points}, (v, i) => step * i).map(t => {
            const E = B * A * 2 * Math.PI * f * Math.sin(2 * Math.PI * f * t);
            return {x: t, y: E};
        });
        setDataE(newDataE);
    }, [B, A, f, R]);

    useEffect(() => {
        const newDataI = dataE.map(element => {
            const I = element.y / R;
            return {x: element.x, y: I};
        });
        setDataI(newDataI);
    }, [dataE, R]);

    return (
        <div style={{textAlign: "center"}}>
            <h2>Визуализация графиков ЭДС и индукционного тока от времени</h2>
            <Plot
                data={[
                    {
                        x: dataE.map(o => o.x),
                        y: dataE.map(o => o.y),
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: 'blue'},
                        name: 'ЭДС'
                    },
                    {
                        x: dataI.map(o => o.x),
                        y: dataI.map(o => o.y),
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: 'red'},
                        name: 'Индукционный ток'
                    }
                ]}
                layout={{
                    width: 900,
                    height: 600,
                    xaxis: {title: 'Время (с)'},
                    yaxis: {title: 'Еденица измерения (Ом, А)'},
                    title: 'Графики ЭДС и индукционного тока от времени'
                }}
            />
            <div>
                <label>
                    Введите величину магнитного поля B ( Т ) :
                    <input style = {{marginLeft: "20px"}} type='number' value={B} onChange={(e) => setB(+e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Введите частоту вращения f ( Гц ) :
                    <input style = {{marginLeft: "20px"}} type='number' value={f} onChange={(e) => setF(+e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Введите сопротивление R ( Ом ) :
                    <input style = {{marginLeft: "20px"}} type='number' value={R} onChange={(e) => setR(+e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Введите площадь контура A ( м² ) :
                    <input style = {{marginLeft: "20px"}} type='number' value={A} onChange={(e) => setA(+e.target.value)}/>
                </label>
            </div>
        </div>
    );
}

export default Chart;