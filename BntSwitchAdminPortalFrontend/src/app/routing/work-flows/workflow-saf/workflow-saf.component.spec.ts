import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SubscribeService } from '@app/services/subscribe.services';

import { WorkflowSafComponent } from './workflow-saf.component';
import { SelectMessageContextList } from '../../../store/selectors/l1-adapter.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'angular-custom-modal';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { SwitchModule } from 'bnt';
import { WorkflowRoutingModule } from '../workflow-routing.module';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class subscribeServiceMock {
  public sendItems(key: any): any {}
}
class matDialogMock {
  public close(key: any): any {}
}

const jsonData = {
  status: 'success',
  message: 'Find MessageContextFields JSON',
  data: {
    messageContextFieldsByVersion: {
      name: 'Message_Context',
      type: 'fields',
      alias: 'Message context',
      nestedName: 'Message_Context',
      useCase: null,
      datatype: null,
      data: null,
      attributes: [
        {
          name: 'transaction_type',
          type: 'field',
          alias: 'TransactionType',
          nestedName: 'transaction_type',
          useCase: '1',
          datatype: null,
          data: ['Cash Withdrawal'],
          attributes: null,
          operator: [
            {
              text: 'Equal',
              value: 'equal',
              key: 'value',
            },
          ],
        },
        {
          name: 'Message_Exchanges',
          type: 'fields',
          alias: 'Message exchanges',
          nestedName: 'Message_Exchanges',
          useCase: null,
          datatype: null,
          data: null,
          attributes: [
            {
              name: 'internal_processing_code',
              type: 'field',
              alias: 'IPC',
              nestedName: 'internal_processing_code',
              useCase: '2',
              datatype: null,
              data: ['ACCOUNT  LISTING', 'account listing', 'TRANSACTION_TIMEOUT', 'value'],
              attributes: null,
              operator: [
                {
                  text: 'Equal',
                  value: 'equal',
                  key: 'value',
                },
              ],
            },
            {
              name: 'IMF',
              type: 'fields',
              alias: 'Imf',
              nestedName: null,
              useCase: null,
              datatype: null,
              data: null,
              attributes: [
                {
                  name: 'fee_and_conversion_rate',
                  type: 'fields',
                  alias: 'Fee and conversion rate',
                  nestedName: 'fee_and_conversion_rate',
                  useCase: null,
                  datatype: null,
                  data: null,
                  attributes: [
                    {
                      name: 'amount_cardholder_fee',
                      type: 'fields',
                      alias: 'Amount cardholder fee',
                      nestedName: 'fee_and_conversion_rate.amount_cardholder_fee',
                      useCase: null,
                      datatype: null,
                      data: null,
                      attributes: [
                        {
                          name: 'value',
                          type: 'field',
                          alias: 'Value',
                          nestedName: 'fee_and_conversion_rate.amount_cardholder_fee.value',
                          useCase: null,
                          datatype: null,
                          data: null,
                          attributes: null,
                          operator: [
                            {
                              text: 'Equal',
                              value: 'equal',
                              key: 'value',
                            },
                          ],
                        },
                        {
                          name: 'minor_unit',
                          type: 'field',
                          alias: 'Currency minor unit',
                          nestedName: 'fee_and_conversion_rate.amount_cardholder_fee.minor_unit',
                          useCase: null,
                          datatype: null,
                          data: null,
                          attributes: null,
                          operator: [
                            {
                              text: 'Equal',
                              value: 'equal',
                              key: 'value',
                            },
                          ],
                        },
                        {
                          name: 'currency',
                          type: 'field',
                          alias: 'currency code',
                          nestedName: 'fee_and_conversion_rate.amount_cardholder_fee.currency',
                          useCase: null,
                          datatype: null,
                          data: null,
                          attributes: null,
                          operator: [
                            {
                              text: 'Equal',
                              value: 'equal',
                              key: 'value',
                            },
                          ],
                        },
                      ],
                      operator: [
                        {
                          text: 'Equal',
                          value: 'equal',
                          key: 'value',
                        },
                      ],
                    },
                    {
                      name: 'conversion_rate_settlement',
                      type: 'field',
                      alias: 'Conversion rate settlement',
                      nestedName: 'fee_and_conversion_rate.conversion_rate_settlement',
                      useCase: null,
                      datatype: null,
                      data: null,
                      attributes: null,
                      operator: [
                        {
                          text: 'Equal',
                          value: 'equal',
                          key: 'value',
                        },
                      ],
                    },
                    {
                      name: 'conversion_rate_cardholder_billing',
                      type: 'field',
                      alias: 'Conversion rate cardholder billing',
                      nestedName: 'fee_and_conversion_rate.conversion_rate_cardholder_billing',
                      useCase: null,
                      datatype: null,
                      data: null,
                      attributes: null,
                      operator: [
                        {
                          text: 'Equal',
                          value: 'equal',
                          key: 'value',
                        },
                      ],
                    },
                    {
                      name: 'amount_fees',
                      type: 'fields',
                      alias: 'Amount fees',
                      nestedName: 'fee_and_conversion_rate.amount_fees',
                      useCase: null,
                      datatype: null,
                      data: null,
                      attributes: [
                        {
                          name: 'code',
                          type: 'field',
                          alias: 'Code',
                          nestedName: 'fee_and_conversion_rate.amount_fees.code',
                          useCase: null,
                          datatype: null,
                          data: null,
                          attributes: null,
                          operator: [
                            {
                              text: 'Equal',
                              value: 'equal',
                              key: 'value',
                            },
                          ],
                        },
                        {
                          name: 'conversion_rate_fee',
                          type: 'field',
                          alias: 'Conversion rate fee',
                          nestedName: 'fee_and_conversion_rate.amount_fees.conversion_rate_fee',
                          useCase: null,
                          datatype: null,
                          data: null,
                          attributes: null,
                          operator: [
                            {
                              text: 'Equal',
                              value: 'equal',
                              key: 'value',
                            },
                            {
                              text: 'Null',
                              value: 'null',
                              key: 'value',
                            },
                          ],
                        },
                        {
                          name: 'transaction_amount_fee',
                          type: 'fields',
                          alias: 'Transaction amount fee',
                          nestedName: 'fee_and_conversion_rate.amount_fees.transaction_amount_fee',
                          useCase: null,
                          datatype: null,
                          data: null,
                          attributes: [
                            {
                              name: 'value',
                              type: 'field',
                              alias: 'Value',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.transaction_amount_fee.value',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                            {
                              name: 'minor_unit',
                              type: 'field',
                              alias: 'Currency minor unit',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.transaction_amount_fee.minor_unit',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                            {
                              name: 'currency',
                              type: 'field',
                              alias: 'currency code',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.transaction_amount_fee.currency',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                          ],
                          operator: [
                            {
                              text: 'Equal',
                              value: 'equal',
                              key: 'value',
                            },
                          ],
                        },
                        {
                          name: 'settlement_amount_fee',
                          type: 'fields',
                          alias: 'Settlement amount fee',
                          nestedName: 'fee_and_conversion_rate.amount_fees.settlement_amount_fee',
                          useCase: null,
                          datatype: null,
                          data: null,
                          attributes: [
                            {
                              name: 'value',
                              type: 'field',
                              alias: 'Value',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.settlement_amount_fee.value',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Like',
                                  value: 'like',
                                  key: 'pattern',
                                },
                              ],
                            },
                            {
                              name: 'minor_unit',
                              type: 'field',
                              alias: 'Currency minor unit',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.settlement_amount_fee.minor_unit',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                            {
                              name: 'currency',
                              type: 'field',
                              alias: 'currency code',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.settlement_amount_fee.currency',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                          ],
                          operator: [
                            {
                              text: 'Equal',
                              value: 'equal',
                              key: 'value',
                            },
                            {
                              text: 'LessThanEqual',
                              value: 'lessThanEqual',
                              key: 'value',
                            },
                            {
                              text: 'Null',
                              value: 'null',
                              key: 'value',
                            },
                          ],
                        },
                        {
                          name: 'fees_terminal',
                          type: 'fields',
                          alias: 'Fees terminal',
                          nestedName: 'fee_and_conversion_rate.amount_fees.fees_terminal',
                          useCase: null,
                          datatype: null,
                          data: null,
                          attributes: [
                            {
                              name: 'value',
                              type: 'field',
                              alias: 'Value',
                              nestedName: 'fee_and_conversion_rate.amount_fees.fees_terminal.value',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                            {
                              name: 'minor_unit',
                              type: 'field',
                              alias: 'Currency minor unit',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.fees_terminal.minor_unit',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                            {
                              name: 'currency',
                              type: 'field',
                              alias: 'currency code',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.fees_terminal.currency',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                          ],
                          operator: [
                            {
                              text: 'Equal',
                              value: 'equal',
                              key: 'value',
                            },
                            {
                              text: 'LessThanEqual',
                              value: 'lessThanEqual',
                              key: 'value',
                            },
                            {
                              text: 'Null',
                              value: 'null',
                              key: 'value',
                            },
                          ],
                        },
                        {
                          name: 'fees_convenience',
                          type: 'fields',
                          alias: 'Fees convenience',
                          nestedName: 'fee_and_conversion_rate.amount_fees.fees_convenience',
                          useCase: null,
                          datatype: null,
                          data: null,
                          attributes: [
                            {
                              name: 'value',
                              type: 'field',
                              alias: 'Value',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.fees_convenience.value',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Like',
                                  value: 'like',
                                  key: 'pattern',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                            {
                              name: 'minor_unit',
                              type: 'field',
                              alias: 'Currency minor unit',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.fees_convenience.minor_unit',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                            {
                              name: 'currency',
                              type: 'field',
                              alias: 'currency code',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.fees_convenience.currency',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                          ],
                          operator: [
                            {
                              text: 'Equal',
                              value: 'equal',
                              key: 'value',
                            },
                            {
                              text: 'Null',
                              value: 'null',
                              key: 'value',
                            },
                          ],
                        },
                        {
                          name: 'fees_network',
                          type: 'fields',
                          alias: 'Fees network',
                          nestedName: 'fee_and_conversion_rate.amount_fees.fees_network',
                          useCase: null,
                          datatype: null,
                          data: null,
                          attributes: [
                            {
                              name: 'value',
                              type: 'field',
                              alias: 'Value',
                              nestedName: 'fee_and_conversion_rate.amount_fees.fees_network.value',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Like',
                                  value: 'like',
                                  key: 'pattern',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                            {
                              name: 'minor_unit',
                              type: 'field',
                              alias: 'Currency minor unit',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.fees_network.minor_unit',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'LessThanEqual',
                                  value: 'lessThanEqual',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                            {
                              name: 'currency',
                              type: 'field',
                              alias: 'currency code',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.fees_network.currency',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Like',
                                  value: 'like',
                                  key: 'pattern',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                          ],
                          operator: [
                            {
                              text: 'Equal',
                              value: 'equal',
                              key: 'value',
                            },
                            {
                              text: 'Like',
                              value: 'like',
                              key: 'pattern',
                            },
                            {
                              text: 'Null',
                              value: 'null',
                              key: 'value',
                            },
                          ],
                        },
                        {
                          name: 'fees_for_ex',
                          type: 'fields',
                          alias: 'Fees for ex',
                          nestedName: 'fee_and_conversion_rate.amount_fees.fees_for_ex',
                          useCase: null,
                          datatype: null,
                          data: null,
                          attributes: [
                            {
                              name: 'value',
                              type: 'field',
                              alias: 'Value',
                              nestedName: 'fee_and_conversion_rate.amount_fees.fees_for_ex.value',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                            {
                              name: 'minor_unit',
                              type: 'field',
                              alias: 'Currency minor unit',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.fees_for_ex.minor_unit',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Like',
                                  value: 'like',
                                  key: 'pattern',
                                },
                                {
                                  text: 'In',
                                  value: 'in',
                                  key: 'value',
                                },
                                {
                                  text: 'StartsWith',
                                  value: 'starts_with',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                            {
                              name: 'currency',
                              type: 'field',
                              alias: 'currency code',
                              nestedName:
                                'fee_and_conversion_rate.amount_fees.fees_for_ex.currency',
                              useCase: null,
                              datatype: null,
                              data: null,
                              attributes: null,
                              operator: [
                                {
                                  text: 'Equal',
                                  value: 'equal',
                                  key: 'value',
                                },
                                {
                                  text: 'Like',
                                  value: 'like',
                                  key: 'pattern',
                                },
                                {
                                  text: 'In',
                                  value: 'in',
                                  key: 'value',
                                },
                                {
                                  text: 'StartsWith',
                                  value: 'starts_with',
                                  key: 'value',
                                },
                                {
                                  text: 'LessThanEqual',
                                  value: 'lessThanEqual',
                                  key: 'value',
                                },
                                {
                                  text: 'Null',
                                  value: 'null',
                                  key: 'value',
                                },
                              ],
                            },
                          ],
                          operator: [
                            {
                              text: 'Equal',
                              value: 'equal',
                              key: 'value',
                            },
                            {
                              text: 'Like',
                              value: 'like',
                              key: 'pattern',
                            },
                            {
                              text: 'In',
                              value: 'in',
                              key: 'value',
                            },
                            {
                              text: 'StartsWith',
                              value: 'starts_with',
                              key: 'value',
                            },
                            {
                              text: 'RegEx',
                              value: 'pattern',
                              key: 'pattern',
                            },
                            {
                              text: 'GreaterThan',
                              value: 'greaterThan',
                              key: 'value',
                            },
                            {
                              text: 'LessThan',
                              value: 'lessThan',
                              key: 'value',
                            },
                            {
                              text: 'GreaterThanEqual',
                              value: 'greaterThanEqual',
                              key: 'value',
                            },
                            {
                              text: 'LessThanEqual',
                              value: 'lessThanEqual',
                              key: 'value',
                            },
                            {
                              text: 'Null',
                              value: 'null',
                              key: 'value',
                            },
                          ],
                        },
                      ],
                      operator: [
                        {
                          text: 'Equal',
                          value: 'equal',
                          key: 'value',
                        },
                        {
                          text: 'Like',
                          value: 'like',
                          key: 'pattern',
                        },
                        {
                          text: 'In',
                          value: 'in',
                          key: 'value',
                        },
                        {
                          text: 'StartsWith',
                          value: 'starts_with',
                          key: 'value',
                        },
                        {
                          text: 'RegEx',
                          value: 'pattern',
                          key: 'pattern',
                        },
                        {
                          text: 'GreaterThan',
                          value: 'greaterThan',
                          key: 'value',
                        },
                        {
                          text: 'LessThan',
                          value: 'lessThan',
                          key: 'value',
                        },
                        {
                          text: 'GreaterThanEqual',
                          value: 'greaterThanEqual',
                          key: 'value',
                        },
                        {
                          text: 'LessThanEqual',
                          value: 'lessThanEqual',
                          key: 'value',
                        },
                        {
                          text: 'Null',
                          value: 'null',
                          key: 'value',
                        },
                      ],
                    },
                  ],
                  operator: [
                    {
                      text: 'Equal',
                      value: 'equal',
                      key: 'value',
                    },
                    {
                      text: 'Like',
                      value: 'like',
                      key: 'pattern',
                    },
                    {
                      text: 'In',
                      value: 'in',
                      key: 'value',
                    },
                    {
                      text: 'StartsWith',
                      value: 'starts_with',
                      key: 'value',
                    },
                    {
                      text: 'RegEx',
                      value: 'pattern',
                      key: 'pattern',
                    },
                    {
                      text: 'GreaterThan',
                      value: 'greaterThan',
                      key: 'value',
                    },
                    {
                      text: 'LessThan',
                      value: 'lessThan',
                      key: 'value',
                    },
                    {
                      text: 'GreaterThanEqual',
                      value: 'greaterThanEqual',
                      key: 'value',
                    },
                    {
                      text: 'LessThanEqual',
                      value: 'lessThanEqual',
                      key: 'value',
                    },
                    {
                      text: 'Null',
                      value: 'null',
                      key: 'value',
                    },
                  ],
                },
              ],
              operator: [
                {
                  text: 'Equal',
                  value: 'equal',
                  key: 'value',
                },
                {
                  text: 'Like',
                  value: 'like',
                  key: 'pattern',
                },
                {
                  text: 'In',
                  value: 'in',
                  key: 'value',
                },
                {
                  text: 'StartsWith',
                  value: 'starts_with',
                  key: 'value',
                },
                {
                  text: 'RegEx',
                  value: 'pattern',
                  key: 'pattern',
                },
              ],
            },
          ],
          operator: null,
        },
      ],
      operator: null,
    },
  },
};

describe('WorkflowSafComponent', () => {
  let component: WorkflowSafComponent;
  let fixture: ComponentFixture<WorkflowSafComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectJsonData: MemoizedSelector<any, any>;
  let subscribe: SubscribeService;
  let matDialog: MatDialogRef<WorkflowSafComponent>;

  beforeEach(() => {
    const workflowSaf = jasmine.createSpyObj('L1AdapterService', ['SelectMessageContextList']);
    TestBed.configureTestingModule({
      declarations: [WorkflowSafComponent],
      providers: [
        { SubscribeService, useClass: subscribeServiceMock },
        { provide: L1AdapterService, useValue: workflowSaf },
        { provide: MatDialogRef, useClass: matDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideMockStore(),
      ],
      imports: [
        InfiniteScrollModule,
        SharedModule,
        CommonModule,
        WorkflowRoutingModule,
        NgSelectModule,
        // SwitchModule,
        ModalModule,
        FormsModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        CommonModule
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    subscribe = TestBed.inject(SubscribeService);
    matDialog = TestBed.inject(MatDialogRef);
    mockselectJsonData = mockStore.overrideSelector(SelectMessageContextList, jsonData);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowSafComponent);
    component = fixture.componentInstance;
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
