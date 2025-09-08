package com.zplus.counselling.config;

import org.hibernate.boot.model.TypeContributions;
import org.hibernate.dialect.H2Dialect;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.SqlTypes;
import org.hibernate.type.descriptor.sql.spi.DdlTypeRegistry;

/**
 * Custom H2 dialect that maps JSONB to CLOB for H2 compatibility
 */
public class H2JsonDialect extends H2Dialect {

    @Override
    protected void registerColumnTypes(TypeContributions typeContributions, ServiceRegistry serviceRegistry) {
        super.registerColumnTypes(typeContributions, serviceRegistry);
        
        final DdlTypeRegistry ddlTypeRegistry = typeContributions.getTypeConfiguration().getDdlTypeRegistry();
        
        // Map JSON/JSONB to CLOB for H2 compatibility
        ddlTypeRegistry.addDescriptor(SqlTypes.JSON, ddlTypeRegistry.getDescriptor(SqlTypes.CLOB));
    }
}