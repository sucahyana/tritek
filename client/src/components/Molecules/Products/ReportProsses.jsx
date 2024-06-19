// File: ReportProses.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#E4E4E4', padding: 20 },
    section: { margin: 10, padding: 10, flexGrow: 1 },
    inputField: { marginBottom: 10, paddingBottom: 5, borderBottom: '1px solid black' },
    label: { fontSize: 12, marginBottom: 4 },
    value: { fontSize: 12 }
});

const ReportProses = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Laporan Produksi</Text>
                {data.map((item, index) => (
                    <View key={index} style={styles.inputField}>
                        <Text style={styles.label}>{item.label}:</Text>
                        <Text style={styles.value}>{item.value}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default ReportProses;
