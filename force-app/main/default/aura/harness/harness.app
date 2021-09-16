<!-- 
    In order to preview, we use an Aura App to do so.
    If this app is for preview pruposes, it's called the harness app by convention. This is the typical case,
    as this preview app is usually just that: a preview, not the final home.
 -->
<aura:application extends="force:slds">

    <!-- 
        We place our little baby component in the harness and it holds it securely, safe from chaos 
        Hence the name "Harness App"
    -->
    <c:Guitar />
    <c:Forms />
</aura:application>