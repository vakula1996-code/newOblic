import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {techniqueHistory, techniqueInformation} from "../../http/Technique";
import {documentHisory} from "../../http/Documents";

const DetailLookTechnique = () => {
    const [info, setInfo] = useState([])
    const [history, setHistory] = useState([])
    const [historyDocument, setHistoryDocument] = useState([])
    const params = useParams()
    useEffect(() => {
        techniqueInformation(params.subdivisionId, params.id).then(data => setInfo([data]))
        techniqueHistory(params.subdivisionId, params.id).then(data => setHistory(data))
        documentHisory(params.subdivisionId, params.id).then(data => setHistoryDocument(data))
    }, [])
    return (
        <div>
            <h2>Детальна інформація</h2>

            <table>
                <thead>
                <tr>
                    <th>Підрозділ</th>
                    <th>Тип техніки</th>
                    <th>Назва техніки</th>
                    <th>Серійний номер</th>
                    <th>Дата ведення в експлутацію</th>
                    <th>Категорія</th>
                </tr>
                </thead>
                <tbody>
                {
                    info.map(({
                                  subdivision,
                                  typeTechnique,
                                  nameTechnique,
                                  serialNumber,
                                  commissioningDate,
                                  category
                              }, index) =>
                        <tr key={index}>
                            <td>{subdivision}</td>
                            <td>{typeTechnique}</td>
                            <td>{nameTechnique}</td>
                            <td>{serialNumber}</td>
                            <td>{commissioningDate === null
                                ? 'відсутня іформація'
                                : commissioningDate
                            }</td>
                            <td>{category}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h2>Історія руху</h2>

            <table>
                <thead>
                <th>З якого підрозділу</th>
                <th>В який</th>
                <th>Дата</th>
                </thead>
                <tbody>
                {history.map(({
                                  toSubdivision,
                                  fromSubdivision,
                                  date,
                                  documents
                              }, index) =>
                    <tr key={index}>
                        <td>{fromSubdivision}</td>
                        <td>{toSubdivision}</td>
                        <td>{date}</td>
                        <td>
                            <table>
                                <thead>
                                <tr>
                                    <th>Номер документа</th>
                                    <th>Назва документа</th>
                                </tr>
                                </thead>
                                <tbody>
                                {documents ?
                                    documents.map(({numberDocument, nameDocument}, index) =>
                                        <tr key={index}>
                                            <td>{numberDocument}</td>
                                            <td>{nameDocument}</td>
                                        </tr>
                                    )
                                    : <></>
                                }
                                </tbody>
                            </table>

                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <h2>Історія документів</h2>

            <table>
                <thead>
                <th>З якого підрозділу</th>
                <th>В який</th>
                <th>Дата</th>
                <th>Статус</th>
                </thead>
                <tbody>
                {historyDocument.map(({
                                          toSubdivision,
                                          fromSubdivision,
                                          date,
                                          status,
                                          documents
                                      }, index) =>
                    <tr key={index}>
                        <td>{fromSubdivision}</td>
                        <td>{toSubdivision}</td>
                        <td>{date}</td>
                        <td><input type="checkbox" checked={status}/></td>
                        <td>
                            <table>
                                <thead>
                                <tr>
                                    <th>Номер документа</th>
                                    <th>Назва документа</th>
                                </tr>
                                </thead>
                                <tbody>
                                {documents ?
                                    documents.map(({numberDocument, nameDocument}, index) =>
                                        <tr key={index}>
                                            <td>{numberDocument}</td>
                                            <td>{nameDocument}</td>
                                        </tr>
                                    )
                                    : <></>
                                }
                                </tbody>
                            </table>

                        </td>
                    </tr>
                )}
                </tbody>
            </table>

        </div>
    );
};

export default DetailLookTechnique;