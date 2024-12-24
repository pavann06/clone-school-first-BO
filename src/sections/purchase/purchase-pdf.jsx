import { sum } from 'lodash';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';

import { fDate } from 'src/utils/format-time';
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
          padding: 24,
          margin: 'auto',
          borderTopWidth: 1,
          borderStyle: 'solid',
          position: 'absolute',
          borderColor: '#DFE3E8',
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
          width: '50%',
          paddingRight: 16,
        },
        tableCell_3: {
          width: '15%',
        },
      }),
    []
  );

// ----------------------------------------------------------------------

export default function PurchasePDF({ purchase }) {
  const totalOnRow = purchase.items.map((item) => parseFloat(item.total));

  const subTotal = sum(totalOnRow);
  const round_off = Math.round(subTotal) - subTotal;

  const { items, order_no, order_date, supplier, organizer, final_amount } = purchase;

  const styles = useStyles();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source={purchase.client.logo} style={{ width: 48, height: 48 }} />

          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>BILLED</Text>
            <Text> {`RCPT-${order_no}`} </Text>
            <Text style={styles.h5}>{fDate(order_date)}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>Supplier</Text>
            <Text style={styles.body2}>{supplier.full_name}</Text>
            <Text style={styles.body2}>{supplier.address1}</Text>
            <Text style={styles.body2}>{supplier.mobile}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>{organizer && 'Organizer'}</Text>
            <Text style={styles.body2}>{organizer?.full_name}</Text>
            <Text style={styles.body2}>{organizer?.address1}</Text>
            <Text style={styles.body2}>{organizer?.mobile}</Text>
          </View>
        </View>

        {/* <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>Date</Text>
            <Text style={styles.body2}>{fDate(order_date)}</Text>
          </View>
        </View> */}

        <Text style={[styles.subtitle1, styles.mb8]}>Purchase Details</Text>

        <View style={styles.table}>
          <View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Products</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Bags</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Net Weight</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Price</Text>
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Total</Text>
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
                  <Text style={styles.subtitle2}>{item.bags}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{item.net_weight}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{fCurrency(item.price)}</Text>
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(parseFloat(item.total))}</Text>
                </View>
              </View>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
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
              <View style={styles.tableCell_3}>
                <Text>Round Off</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{round_off ? fCurrency(round_off) : '₹0'}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
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
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{fCurrency(parseFloat(final_amount))}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]} fixed>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text>We appreciate your business.</Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>{purchase.client.email}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

PurchasePDF.propTypes = {
  purchase: PropTypes.object,
};
