import { sum } from 'lodash';
import { useMemo } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';

import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        col4: { width: '25%' },
        col8: { width: '75%' },
        col6: { width: '50%' },
        mb4: { marginBottom: 4 },
        mb8: { marginBottom: 8 },
        mb40: { marginBottom: 40 },
        h3: { fontSize: 16, fontWeight: 700 },
        h4: { fontSize: 13, fontWeight: 700 },
        h5: { fontSize: 11, fontWeight: 700 },
        body1: { fontSize: 10 },
        body2: { fontSize: 9 },
        subtitle1: { fontSize: 10, fontWeight: 700 },
        subtitle2: { fontSize: 9, fontWeight: 700 },
        alignRight: { textAlign: 'right' },
        page: {
          fontSize: 9,
          lineHeight: 1.6,
          fontFamily: 'Roboto',
          backgroundColor: '#FFFFFF',
          textTransform: 'capitalize',
          padding: '40px 24px 120px 24px',
        },
        footer: {
          left: 0,
          right: 0,
          bottom: 0,
          paddingLeft: 100,
        },
        gridContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        table: {
          display: 'flex',
          width: 'auto',
        },
        tableRow: {
          padding: '8px 0',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#DFE3E8',
        },
        noBorder: {
          paddingTop: 8,
          paddingBottom: 0,
          borderBottomWidth: 0,
        },
        tableCell_1: {
          width: '5%',
        },
        tableCell_2: {
          width: '30%',
          paddingRight: 16,
        },
        tableCell_3: {
          width: '15%',
        },
      }),
    []
  );

// ----------------------------------------------------------------------

export default function DcPDF({ sales }) {
  const totalOnRow = sales.items.map((item) => parseFloat(item.total));

  const subTotal = sum(totalOnRow);
  const round_off = Math.round(subTotal) - subTotal;

  const {
    items,
    order_date,
    customer,
    distributor,
    final_amount,
    freight_charges,
    ref_no,
    truck_no,
  } = sales;

  const styles = useStyles();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ borderWidth: 1, borderStyle: 'solid', padding: 4, boxSizing: 'border-box' }}>
          <View style={[styles.gridContainer]}>
            <Image source={sales.client.logo} style={{ width: 50, height: 50 }} />
            <Text style={{ marginRight: 250 }}>
              {sales.client.full_name},{'\n'}
              {sales.client.address},{sales.client.state},{'\n'}
              License No: {sales.client.license_number}, GSTIN: {sales.client.gst_number}, {'\n'}
              {sales.client.mobile}
            </Text>
            <View style={[styles.alignRight]}>
              <Text style={styles.h5}>
                {(sales.status === 'INVOICE' && `INV-${sales.order_no}`) ||
                  (sales.status === 'DELIVERY-CHALLAN' && `DC-${sales.order_no}`) ||
                  (sales.status === 'REJECTED' && '')}
              </Text>
              <Text style={styles.h6}>{format(new Date(order_date), 'dd-MM-yyyy')}</Text>
            </View>
          </View>

          <View style={[styles.gridContainer, { borderTopWidth: 0.3, borderTopColor: '#000' }]}>
            <View style={{ flexDirection: 'column', marginTop: 10 }}>
              <View style={[styles.col6, { paddingLeft: 10 }]}>
                <Text style={[styles.subtitle2, styles.mb4]}>Consignee</Text>
                <Text style={styles.body2}>{customer.full_name}</Text>
                <Text style={styles.body2}>{customer.address1}</Text>
                <Text style={styles.body2}>{customer.mobile}</Text>
              </View>

              <View style={{ paddingLeft: 10 }}>
                <Text style={[styles.subtitle2, styles.mb4]}>{distributor && 'Buyer'}</Text>
                <Text style={styles.body2}>{distributor?.full_name}</Text>
                <Text style={styles.body2}>{distributor?.address1}</Text>
                <Text style={styles.body2}>{distributor?.mobile}</Text>
              </View>
            </View>

            <View style={{ paddingRight: 100, borderLeftWidth: 0.3, borderLeftColor: '#000' }}>
              <View style={{ marginTop: 10, paddingLeft: 10 }}>
                <Text>Document No: {ref_no}</Text>
                <Text>Dispatched Through: {truck_no}</Text>
                <Text>Destination: {customer.city}</Text>
                <Text style={styles.subtitle2}>Terms of Delivery:</Text>
                <Text>
                  • Delivery Address as specified by the customer{'\n'} • Delivery Schedule as
                  agreed upon during order placement{'\n'} • Products delivered in good
                  condition;inspect upon receipt.
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={[
              styles.subtitle1,
              styles.mb8,
              { borderTopWidth: 0.3, borderTopColor: '#000', paddingTop: 10 },
            ]}
          >
            Sales Details
          </Text>

          <View style={styles.table}>
            <View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell_1}>
                  <Text style={styles.subtitle2}>#</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>PRODUCTS</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>BAGS</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>NET WEIGHT</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>PRICE</Text>
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.subtitle2}>TOTAL</Text>
                </View>
              </View>
            </View>

            <View>
              {items.map((item, index) => (
                <View style={styles.tableRow} key={item.id}>
                  <View style={styles.tableCell_1}>
                    <Text>{index + 1}</Text>
                  </View>

                  <View style={styles.tableCell_2}>
                    <Text style={styles.subtitle2}>{item.product_name}</Text>
                  </View>

                  <View style={styles.tableCell_3}>
                    <Text>{item.bags}</Text>
                  </View>

                  <View style={styles.tableCell_3}>
                    <Text>{item.net_weight}</Text>
                  </View>

                  <View style={styles.tableCell_3}>
                    <Text>{fCurrency(item.price)}</Text>
                  </View>

                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text> {fCurrency(parseFloat(item.total))}</Text>
                  </View>
                </View>
              ))}

              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text>Sub Total</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(subTotal)}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text>Round Off</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text> {round_off ? fCurrency(round_off) : '₹0'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text>Freight Charges</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text> {fCurrency(freight_charges)}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text>Taxes</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>₹0</Text>
                </View>
              </View>

              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text style={styles.h4}>Total</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.h4}> {fCurrency(parseFloat(final_amount))}</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.gridContainer,
              styles.mb6,
              { borderTopWidth: 0.3, borderTopColor: '#000' },
            ]}
          >
            <View style={[styles.col6, { paddingLeft: 10, paddingTop: 10 }]}>
              <Text style={styles.subtitle2}>Declaration</Text>
              <Text>
                We declare that, this invoice shows actual price of goods described and that all
                particulars are true and correct
              </Text>
            </View>
            <View style={[styles.col8, styles.mb4, { paddingLeft: 135, paddingTop: 10 }]}>
              <Text style={[styles.subtitle2]}>Bank Details</Text>
              <Text>Beneficiary Name: {sales.bank.beneficiary_name} </Text>
              <Text>Bank Name: {sales.bank.bank_name} </Text>
              <Text>Account No: {sales.bank.account_no} </Text>
              <Text>Branch: {sales.bank.branch_name} </Text>
              <Text>IFSC Code: {sales.bank.ifsc_code} </Text>
            </View>
          </View>

          <View style={[styles.alignRight, { marginTop: 40, paddingRight: 50 }]}>
            <View style={{ textAlign: 'right' }}>
              <Text>{sales.client.full_name} </Text>
              <Text>Authorized Signotary</Text>
            </View>
          </View>
        </View>
        <View style={[styles.footer]} fixed>
          <View style={[styles.col8, { justifyContent: 'center' }]}>
            <Text>
              This is a system generated Invoice/Delivery Challan.No signature is requried.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

DcPDF.propTypes = {
  sales: PropTypes.object,
};
