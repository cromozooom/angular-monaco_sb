import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
} from '@angular/core';
import * as monaco from 'monaco-editor';

type Field = {
  name: string;
  schemaName: string;
  value: string;
  type?: string;
};

@Component({
  selector: 'app-text-format',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-format.component.html',
  styles: [
    `
      .editor-container {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
      }
    `,
  ],
})
export class TextFormatComponent implements OnInit, OnDestroy {
  @ViewChild('editorContainer', { static: false }) editorContainer!: ElementRef;
  @Input() dev: boolean = true;
  @Input() title: string = 'Untitled';
  otherFieldsValidWithData: any = [
    {
      name: 'wdx_xdwfield{wdx_srcid}.wdx_investmentrestrictions',
      schemaName: 'wdx_xdwfield{wdx_srcid}.wdx_investmentrestrictions',
      value: 'wdx_xdwfield{wdx_srcid}.wdx_investmentrestrictions',
    },
    {
      name: 'wdx_reviewtype',
      type: 'wdx type',
      schemaName: 'wdx_reviewtype',
      value: 'wdx_reviewtype',
    },
    { name: 'wdx_lastname', schemaName: 'wdx_lastname', value: 'wdx_lastname' },
    {
      name: 'wdx_contactid.wdx_purpose',
      schemaName: 'wdx_contactid.wdx_purpose',
      value: 'wdx_contactid.wdx_purpose',
    },
    {
      name: 'wdx_contactid.wdx_establishmentdate',
      schemaName: 'wdx_contactid.wdx_establishmentdate',
      value: 'wdx_contactid.wdx_establishmentdate',
    },
    {
      name: 'wdx_xdwfield{wdx_srcid}.wdx_valueofcharity',
      schemaName: 'wdx_xdwfield{wdx_srcid}.wdx_valueofcharity',
      value: 'wdx_xdwfield{wdx_srcid}.wdx_valueofcharity',
    },
    {
      name: 'wdx_address1_line1',
      schemaName: 'wdx_address1_line1',
      value: 'wdx_address1_line1',
    },
    {
      name: 'wdx_address1_postalcode',
      schemaName: 'wdx_address1_postalcode',
      value: 'wdx_address1_postalcode',
    },
    {
      name: 'wdx_address1_countryid',
      schemaName: 'wdx_address1_countryid',
      value: 'wdx_address1_countryid',
    },
    {
      name: 'wdx_contactid.wdx_registeredcharitynumber',
      schemaName: 'wdx_contactid.wdx_registeredcharitynumber',
      value: 'wdx_contactid.wdx_registeredcharitynumber',
    },
    {
      name: 'wdx_xdwfield{wdx_srcid}.wdx_taxreferencenumber',
      schemaName: 'wdx_xdwfield{wdx_srcid}.wdx_taxreferencenumber',
      value: 'wdx_xdwfield{wdx_srcid}.wdx_taxreferencenumber',
    },
    {
      name: 'wdx_contactid.wdx_yearenddaydd',
      schemaName: 'wdx_contactid.wdx_yearenddaydd',
      value: 'wdx_contactid.wdx_yearenddaydd',
    },
    {
      name: 'wdx_contactid.wdx_yearendmonth',
      schemaName: 'wdx_contactid.wdx_yearendmonth',
      value: 'wdx_contactid.wdx_yearendmonth',
    },
    {
      name: 'wdx_clientidentificationcode',
      schemaName: 'wdx_clientidentificationcode',
      value: 'wdx_clientidentificationcode',
    },
    {
      name: 'wdx_clientidentificationcodeexpirydate',
      schemaName: 'wdx_clientidentificationcodeexpirydate',
      value: 'wdx_clientidentificationcodeexpirydate',
    },
    {
      name: 'SubForm_Financials_Assets',
      schemaName: 'SubForm_Financials_Assets',
      value: 'SubForm_Financials_Assets',
    },
    {
      name: 'SubForm_Financials_Liabilities',
      schemaName: 'SubForm_Financials_Liabilities',
      value: 'SubForm_Financials_Liabilities',
    },
    {
      name: 'wdx_financialsotherliabilitiesamount',
      schemaName: 'wdx_financialsotherliabilitiesamount',
      value: 'wdx_financialsotherliabilitiesamount',
    },
    {
      name: 'wdx_financialstrustincome',
      schemaName: 'wdx_financialstrustincome',
      value: 'wdx_financialstrustincome',
    },
    {
      name: 'SubForm_Financials_Income',
      schemaName: 'SubForm_Financials_Income',
      value: 'SubForm_Financials_Income',
    },
    {
      name: 'SubForm_Financials_Expenses',
      schemaName: 'SubForm_Financials_Expenses',
      value: 'SubForm_Financials_Expenses',
    },
    {
      name: 'wdx_xdwfield{wdx_srcid}.wdx_investmentknowledge',
      schemaName: 'wdx_xdwfield{wdx_srcid}.wdx_investmentknowledge',
      value: 'wdx_xdwfield{wdx_srcid}.wdx_investmentknowledge',
    },
    {
      name: 'wdx_xdwfield{wdx_srcid}.wdx_investmentobjectivesid',
      schemaName: 'wdx_xdwfield{wdx_srcid}.wdx_investmentobjectivesid',
      value: 'wdx_xdwfield{wdx_srcid}.wdx_investmentobjectivesid',
    },
    {
      name: 'wdx_xdwfield{wdx_srcid}.wdx_investmenttimescale',
      schemaName: 'wdx_xdwfield{wdx_srcid}.wdx_investmenttimescale',
      value: 'wdx_xdwfield{wdx_srcid}.wdx_investmenttimescale',
    },
    {
      name: 'wdx_xdwfield{wdx_srcid}.wdx_risktolerance',
      schemaName: 'wdx_xdwfield{wdx_srcid}.wdx_risktolerance',
      value: 'wdx_xdwfield{wdx_srcid}.wdx_risktolerance',
    },
    {
      name: 'wdx_xdwfield{wdx_srcid}.wdx_riskprofileid',
      schemaName: 'wdx_xdwfield{wdx_srcid}.wdx_riskprofileid',
      value: 'wdx_xdwfield{wdx_srcid}.wdx_riskprofileid',
    },
    {
      name: 'wdx_datevalidfrom',
      schemaName: 'wdx_datevalidfrom',
      value: 'wdx_datevalidfrom',
    },
    {
      name: 'wdx_allmandatorydocumentsattached',
      schemaName: 'wdx_allmandatorydocumentsattached',
      value: 'wdx_allmandatorydocumentsattached',
    },
    {
      name: 'ContactAddresses',
      schemaName: 'ContactAddresses',
      value: 'ContactAddresses',
    },
    {
      name: 'DYNAMIC_clientcategory',
      schemaName: 'DYNAMIC_clientcategory',
      value: 'DYNAMIC_clientcategory',
    },
    {
      name: 'DYNAMIC_clientsubcategory',
      schemaName: 'DYNAMIC_clientsubcategory',
      value: 'DYNAMIC_clientsubcategory',
    },
    {
      name: 'DYNAMIC_roles',
      schemaName: 'DYNAMIC_roles',
      value: 'DYNAMIC_roles',
    },
    {
      name: 'DYNAMIC_servicetypes',
      schemaName: 'DYNAMIC_servicetypes',
      value: 'DYNAMIC_servicetypes',
    },
    {
      name: 'DYNAMIC_suitabilityrequired',
      schemaName: 'DYNAMIC_suitabilityrequired',
      value: 'DYNAMIC_suitabilityrequired',
    },
    {
      name: 'wdx_detailsupdated',
      schemaName: 'wdx_detailsupdated',
      value: 'wdx_detailsupdated',
    },
    {
      name: 'DYNAMIC_userroles',
      schemaName: 'DYNAMIC_userroles',
      value: 'DYNAMIC_userroles',
    },
    {
      name: 'DYNAMIC_userteams',
      schemaName: 'DYNAMIC_userteams',
      value: 'DYNAMIC_userteams',
    },
    {
      name: 'wdx_contactid.wdx_contacttype',
      schemaName: 'wdx_contactid.wdx_contacttype',
      value: 'wdx_contactid.wdx_contacttype',
    },
    {
      name: 'wdx_suitabilityreviewid',
      schemaName: 'wdx_suitabilityreviewid',
      value: 'wdx_suitabilityreviewid',
    },
    {
      name: 'DYNAMIC_entityevaluator_latestcompletedsrc',
      schemaName: 'DYNAMIC_entityevaluator_latestcompletedsrc',
      value: 'DYNAMIC_entityevaluator_latestcompletedsrc',
    },
    {
      name: 'wdx_suitabilityreviewcontactid',
      schemaName: 'wdx_suitabilityreviewcontactid',
      value: 'wdx_suitabilityreviewcontactid',
    },
    {
      name: 'DYNAMIC_entityevaluator_isonboardingorclient',
      schemaName: 'DYNAMIC_entityevaluator_isonboardingorclient',
      value: 'DYNAMIC_entityevaluator_isonboardingorclient',
    },
    {
      name: 'DYNAMIC_entityevaluator_activeclients',
      schemaName: 'DYNAMIC_entityevaluator_activeclients',
      value: 'DYNAMIC_entityevaluator_activeclients',
    },
  ];

  fieldsValidWithData: any = [
    {
      name: 'wdx_ismaster',
      schemaName: 'wdx_ismaster',
      value: 'wdx_ismaster',
    },
    {
      name: 'wdx_internalid',
      type: 'newType',
      schemaName: 'wdx_internalid',
      value: 'wdx_internalid',
    },
    { name: 'wdx_pcode', schemaName: 'wdx_pcode', value: 'wdx_pcode' },
    { name: 'lastname', schemaName: 'lastname', value: 'lastname' },
    { name: 'wdx_title', schemaName: 'wdx_title', value: 'wdx_title' },
    { name: 'firstname', schemaName: 'firstname', value: 'firstname' },
    { name: 'lastname', schemaName: 'lastname', value: 'lastname' },
    { name: 'birthdate', schemaName: 'birthdate', value: 'birthdate' },
    { name: 'telephone1', schemaName: 'telephone1', value: 'telephone1' },
    { name: 'telephone2', schemaName: 'telephone2', value: 'telephone2' },
    { name: 'mobilephone', schemaName: 'mobilephone', value: 'mobilephone' },
    { name: 'fax', schemaName: 'fax', value: 'fax' },
    {
      name: 'emailaddress1',
      schemaName: 'emailaddress1',
      value: 'emailaddress1',
    },
    {
      name: 'emailaddress2',
      schemaName: 'emailaddress2',
      value: 'emailaddress2',
    },
    {
      name: 'wdx_employername',
      schemaName: 'wdx_employername',
      value: 'wdx_employername',
    },
    {
      name: 'wdx_responsiblepartyid',
      schemaName: 'wdx_responsiblepartyid',
      value: 'wdx_responsiblepartyid',
    },
    {
      name: 'wdx_xdwfield{wdx_contactid}.wdx_qualifiedinvestor',
      schemaName: 'wdx_xdwfield{wdx_contactid}.wdx_qualifiedinvestor',
      value: 'wdx_xdwfield{wdx_contactid}.wdx_qualifiedinvestor',
    },
    {
      name: 'wdx_taxresidence',
      schemaName: 'wdx_taxresidence',
      value: 'wdx_taxresidence',
    },
    {
      name: 'wdx_countryofnationalityid',
      schemaName: 'wdx_countryofnationalityid',
      value: 'wdx_countryofnationalityid',
    },
    {
      name: 'wdx_xdwfield{wdx_contactid}.wdx_campaign',
      schemaName: 'wdx_xdwfield{wdx_contactid}.wdx_campaign',
      value: 'wdx_xdwfield{wdx_contactid}.wdx_campaign',
    },
    {
      name: 'wdx_contacttype',
      schemaName: 'wdx_contacttype',
      value: 'wdx_contacttype',
    },
    {
      name: 'wdx_trusttype',
      schemaName: 'wdx_trusttype',
      value: 'wdx_trusttype',
    },
    {
      name: 'wdx_companytrustregistrationnumber',
      schemaName: 'wdx_companytrustregistrationnumber',
      value: 'wdx_companytrustregistrationnumber',
    },
    {
      name: 'wdx_numberofstaff',
      schemaName: 'wdx_numberofstaff',
      value: 'wdx_numberofstaff',
    },
    {
      name: 'wdx_countryofestablishment',
      schemaName: 'wdx_countryofestablishment',
      value: 'wdx_countryofestablishment',
    },
    {
      name: 'customersizecode',
      schemaName: 'customersizecode',
      value: 'customersizecode',
    },
    {
      name: 'wdx_countryofdomicile',
      schemaName: 'wdx_countryofdomicile',
      value: 'wdx_countryofdomicile',
    },
    {
      name: 'wdx_clientjourneystage',
      schemaName: 'wdx_clientjourneystage',
      value: 'wdx_clientjourneystage',
    },
    {
      name: 'DYNAMIC_userroles',
      schemaName: 'DYNAMIC_userroles',
      value: 'DYNAMIC_userroles',
    },
    {
      name: 'wdx_clientjourneystage',
      schemaName: 'wdx_clientjourneystage',
      value: 'wdx_clientjourneystage',
    },
    { name: 'contactid', schemaName: 'contactid', value: 'contactid' },
    {
      name: 'wdx_amldocumentproofnotes',
      schemaName: 'wdx_amldocumentproofnotes',
      value: 'wdx_amldocumentproofnotes',
    },

    {
      name: 'wdx_clientjourneystage',
      schemaName: 'wdx_clientjourneystage',
      value: 'wdx_clientjourneystage',
    },
    {
      name: 'wdx_xdwfield{wdx_contactid}.wdx_lostreason',
      schemaName: 'wdx_xdwfield{wdx_contactid}.wdx_lostreason',
      value: 'wdx_xdwfield{wdx_contactid}.wdx_lostreason',
    },
    {
      name: 'wdx_xdwfield{wdx_contactid}.wdx_competitor',
      schemaName: 'wdx_xdwfield{wdx_contactid}.wdx_competitor',
      value: 'wdx_xdwfield{wdx_contactid}.wdx_competitor',
    },
    {
      name: 'wdx_xdwfield{wdx_contactid}.wdx_lostcomments',
      schemaName: 'wdx_xdwfield{wdx_contactid}.wdx_lostcomments',
      value: 'wdx_xdwfield{wdx_contactid}.wdx_lostcomments',
    },

    {
      name: 'DYNAMIC_ContactAddressesValid',
      schemaName: 'DYNAMIC_ContactAddressesValid',
      value: 'DYNAMIC_ContactAddressesValid',
    },
    {
      name: 'DYNAMIC_ContactAddressesOnePrimary',
      schemaName: 'DYNAMIC_ContactAddressesOnePrimary',
      value: 'DYNAMIC_ContactAddressesOnePrimary',
    },
    {
      name: 'DYNAMIC_ContactAddressesMultiplePrimary',
      schemaName: 'DYNAMIC_ContactAddressesMultiplePrimary',
      value: 'DYNAMIC_ContactAddressesMultiplePrimary',
    },
    {
      name: 'DYNAMIC_HtmlViewer',
      schemaName: 'DYNAMIC_HtmlViewer',
      value: 'DYNAMIC_HtmlViewer',
    },
    {
      name: 'DYNAMIC_HtmlViewer',
      schemaName: 'DYNAMIC_HtmlViewer',
      value: 'DYNAMIC_HtmlViewer',
    },
    {
      name: 'DYNAMIC_HtmlViewer',
      schemaName: 'DYNAMIC_HtmlViewer',
      value: 'DYNAMIC_HtmlViewer',
    },
    {
      name: 'ContactAddresses',
      schemaName: 'ContactAddresses',
      value: 'ContactAddresses',
    },
  ];
  allFields: any = [];

  allowedPrefixes = ['SOLOPX', 'GET', 'PUT', 'ANDMORE'];
  private currentDecorations: string[] = []; // Track current decorations
  private resizeObserver!: () => void;
  private editorInstance!: monaco.editor.IStandaloneCodeEditor;
  ngOnInit(): void {
    const combinedFields = [
      ...this.fieldsValidWithData,
      ...this.otherFieldsValidWithData,
    ];
    // Remove duplicates by name - keep the first occurrence
    this.allFields = combinedFields.filter(
      (field, index, self) =>
        index === self.findIndex((f) => f.name === field.name)
    );
    this.registerCustomLanguage();
    this.registerCompletionProvider();
    this.registerHoverProvider();
    // Add a resize event listener
    this.resizeObserver = () => {
      this.editorInstance.layout();
    };
    window.addEventListener('resize', this.resizeObserver);
  }

  ngAfterViewInit(): void {
    // Add a small delay to ensure the template outlet has rendered
    setTimeout(() => {
      this.initializeEditor();
    }, 0);
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  _ngAfterViewInit(): void {
    this.initializeEditor();
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  ngOnDestroy(): void {
    // Remove the resize event listener to prevent memory leaks
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }

  onWindowResize(): void {
    if (this.editorInstance) {
      this.editorInstance.layout();
    }
  }

  registerCustomLanguage(): void {
    monaco.languages.register({ id: 'customLanguage' });

    monaco.languages.setMonarchTokensProvider('customLanguage', {
      tokenizer: {
        root: [
          [
            /(GET\(')([^']*)('\))/,
            ['custom-get', 'custom-variable', 'custom-get'],
          ],
        ],
      },
    });

    monaco.editor.defineTheme('customTheme', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'custom-get', foreground: '000000' },
        { token: 'custom-variable', foreground: '000000', fontStyle: 'bold' },
      ],
      colors: {},
    });
  }

  registerHoverProvider(): void {
    monaco.languages.registerHoverProvider('customLanguage', {
      provideHover: (model, position) => {
        const word = model.getWordAtPosition(position);
        if (!word) {
          return null;
        }

        const lineContent = model.getLineContent(position.lineNumber);
        const regex = /GET\('([^']+)'\)/g;
        let match;
        let matchedVariable = null;

        // Find all matches of GET('...') in the line
        while ((match = regex.exec(lineContent)) !== null) {
          const variable = match[1]; // Extract the variable inside GET('...')
          const startIndex = match.index + 5; // Start index of the variable
          const endIndex = startIndex + variable.length; // End index of the variable

          // Check if the hovered word matches the variable
          if (
            position.column >= startIndex + 1 &&
            position.column <= endIndex + 1 &&
            word.word === variable
          ) {
            matchedVariable = variable;
            break;
          }
        }
        if (matchedVariable) {
          // Find the corresponding field data in fieldsValidWithData
          const fieldData = this.fieldsValidWithData.find(
            (field: any) => field.name === matchedVariable
          );

          // If not found in fieldsValidWithData, check in otherFieldsValidWithData
          const otherFieldData = !fieldData
            ? this.otherFieldsValidWithData.find(
                (otherField: any) => otherField.name === matchedVariable
              )
            : null;

          if (fieldData) {
            return {
              range: new monaco.Range(
                position.lineNumber,
                word.startColumn,
                position.lineNumber,
                word.endColumn
              ),
              contents: [
                { value: `**Current Form**` },
                { value: `**Variable:** ${fieldData.name}` },
                { value: `**Type:** ${fieldData.type || 'N/A'}` },
                { value: `**Description:** ${fieldData.value}` },
              ],
            };
          } else if (otherFieldData) {
            return {
              range: new monaco.Range(
                position.lineNumber,
                word.startColumn,
                position.lineNumber,
                word.endColumn
              ),
              contents: [
                { value: `**Hosted field**` },
                { value: `**Variable:** ${otherFieldData.name}` },
                { value: `**Type:** ${otherFieldData.type || 'N/A'}` },
                { value: `**Description:** ${otherFieldData.value}` },
              ],
            };
          } else {
            return {
              range: new monaco.Range(
                position.lineNumber,
                word.startColumn,
                position.lineNumber,
                word.endColumn
              ),
              contents: [
                { value: `**Error**` },
                { value: `no data available for this field` },
                {
                  value: `visit [spx](https://solopx.com) for more information`,
                },
              ],
            };
          }
        }

        return null;
      },
    });
  }

  registerCompletionProvider(): void {
    monaco.languages.registerCompletionItemProvider('customLanguage', {
      triggerCharacters: ["'", ' ', '\t'],
      provideCompletionItems: (model, position) => {
        const lineContent = model.getLineContent(position.lineNumber);
        const textBeforeCursor = lineContent.substring(0, position.column - 1);
        // Count quotes before cursor - if odd number, we're inside quotes
        const quoteCount = (textBeforeCursor.match(/'/g) || []).length;
        const isInsideQuotes = quoteCount % 2 === 1;
        if (isInsideQuotes) {
          console.log('Inside quotes detected'); // Debug log
          const suggestions = this.allFields.map((field: any) => ({
            label: field.name,
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: field.name,
            detail: field.value || '',
            documentation: `Schema: ${field.schemaName || ''}`,
            range: new monaco.Range(
              position.lineNumber,
              position.column,
              position.lineNumber,
              position.column
            ),
          }));

          return { suggestions };
        }

        // Default - show prefix suggestions
        console.log('Showing prefix suggestions'); // Debug log
        const prefixSuggestions = this.allowedPrefixes.map((prefix) => ({
          label: prefix,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: `${prefix}('$1')`,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: `${prefix} function`,
          documentation: `Insert ${prefix}() function with field parameter`,
          range: new monaco.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column
          ),
        }));

        return { suggestions: prefixSuggestions };
      },
    });
  }

  initializeEditor(): void {
    this.editorInstance = monaco.editor.create(
      this.editorContainer.nativeElement,
      {
        value: ` ( GET('wdx_internalid')!=null&& ( GET('wdx_reviewtype').indexOf('Trust')>-1||GET('SPX_DYNAMIC_clientcategory').indexOf('Corporation')>-1 ) ) && ( GET('DYNAMIC_servicetypes')==null||GET('DYNAMIC_servicetypes').indexOf('Financial Planning Transactional (Insurance)')==-1 ) GET('')`,
        language: 'customLanguage',
        theme: 'customTheme',
        wordWrap: 'on',
        minimap: {
          enabled: false, // Disable the minimap
        },
      }
    );

    this.editorInstance.onDidChangeModelContent(() => {
      const code = this.editorInstance.getValue();
      this.highlightVariables(code);
    });

    this.highlightVariables(this.editorInstance.getValue());
  }

  highlightVariables(code: string): void {
    const prefixPattern = this.allowedPrefixes.join('|');
    const regex = new RegExp(`(${prefixPattern})\\('([^']*)'?`, 'g');
    const decorations: monaco.editor.IModelDeltaDecoration[] = [];
    let match;

    while ((match = regex.exec(code)) !== null) {
      const prefix = match[1]; // The prefix (GET, PUT, etc.)
      const variable = match[2]; // Extract the variable inside quotes - THIS WAS THE BUG

      // Calculate the correct start index for the variable
      const prefixLength = prefix.length + 2; // prefix + "('
      const startIndex = match.index + prefixLength;
      const endIndex = startIndex + variable.length;

      const startPosition = this.editorInstance
        .getModel()
        ?.getPositionAt(startIndex);
      const endPosition = this.editorInstance
        .getModel()
        ?.getPositionAt(endIndex);

      if (startPosition && endPosition) {
        decorations.push({
          range: new monaco.Range(
            startPosition.lineNumber,
            startPosition.column,
            endPosition.lineNumber,
            endPosition.column
          ),

          options: {
            inlineClassName: this.fieldsValidWithData.some(
              (field: any) => field.name === variable
            )
              ? 'text-bg-success'
              : !this.fieldsValidWithData.some(
                  (field: any) => field.name === variable
                ) &&
                this.otherFieldsValidWithData.some(
                  (otherField: any) => otherField.name === variable
                )
              ? 'text-bg-warning'
              : 'text-bg-danger',
          },
        });
      }
    }

    this.currentDecorations = this.editorInstance.deltaDecorations(
      this.currentDecorations,
      decorations
    );
  }
}
